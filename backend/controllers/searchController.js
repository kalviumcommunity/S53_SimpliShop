const products = require("../data/products.json");
const { askGemini } = require("../services/gemini");
const {
  buildZeroShotPrompt,
  buildOneShotPrompt,
} = require("../services/promptTemplates");
const { parseJsonWithRepair } = require("../utils/parseRepair");
const Ajv = require("ajv");
const searchSchema = require("../schema/searchResponse.json");

const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(searchSchema);

const MAX_PRODUCTS_IN_PROMPT = 8;

function sliceCandidates(products, query) {
  if (!Array.isArray(products) || !query || typeof query !== "string") {
    return [];
  }

  const q = query.toLowerCase();
  const byNameOrDesc = products.filter(
    (p) =>
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.tags && p.tags.join(" ").toLowerCase().includes(q))
  );
  return (byNameOrDesc.length ? byNameOrDesc : products)
    .slice(0, MAX_PRODUCTS_IN_PROMPT)
    .map((p) => ({
      id: String(p.id),
      name: p.name,
      brand: p.brand,
      category: p.category,
      price: p.price,
      pros: p.pros,
      cons: p.cons,
      tags: p.tags,
      description: p.description,
    }));
}

async function searchProduct(req, res) {
  try {
    const { query, mode = "zero-shot" } = req.body;
    if (!query) return res.status(400).json({ error: "query required" });

    const candidates = sliceCandidates(products, query);

    let prompt;
    switch (mode) {
      case "one-shot":
        prompt = buildOneShotPrompt(query, candidates);
        break;
      case "zero-shot":
      default:
        prompt = buildZeroShotPrompt(query, candidates);
    }

    const raw = await askGemini(prompt);

    const parsed = await parseJsonWithRepair(raw, searchSchema);
    if (!parsed.ok) {
      return res.status(200).json({
        query,
        warning: "LLM output could not be parsed",
        candidates,
        llm_raw: raw,
      });
    }

    const recommendation = parsed.json;

    const valid = validate(recommendation);
    if (!valid) {
      return res.status(200).json({
        query,
        warning: "Invalid schema",
        candidates,
        recommendation,
        validationErrors: validate.errors,
      });
    }

    return res.json({ query, candidates, recommendation });
  } catch (err) {
    console.error("Search error:", err);
    return res
      .status(500)
      .json({ error: "internal server error", details: err.message });
  }
}

module.exports = { searchProduct };
