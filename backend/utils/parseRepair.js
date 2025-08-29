const { askGemini } = require("../services/gemini");
const MAX_REPAIRS = 1;

async function parseJsonWithRepair(rawText, schemaForInstruction = null, attempts = MAX_REPAIRS) {
  const cleaned = rawText.replace(/```json|```/g, "").trim();
  try {
    const parsed = JSON.parse(cleaned);
    return { ok: true, json: parsed };
  } catch (e) {
    if (attempts <= 0) return { ok: false, raw: rawText, error: "invalid json" };
    let repairPrompt = `The following text should be converted to valid JSON. Return only JSON, nothing else:\n\n${rawText}\n\n`;
    if (schemaForInstruction) {
      repairPrompt += `\nThe JSON must conform to this schema:\n${JSON.stringify(schemaForInstruction, null, 2)}\n\nReturn only valid JSON.`;
    } else {
      repairPrompt += "Return only valid JSON.";
    }
    try {
      const repaired = await askGemini(repairPrompt);
      const cleaned2 = repaired.replace(/```json|```/g, "").trim();
      const parsed2 = JSON.parse(cleaned2);
      return { ok: true, json: parsed2, repaired };
    } catch (e2) {
      return { ok: false, raw: rawText, repaired: e2.message || "repair failed", error: e2 };
    }
  }
}

module.exports = { parseJsonWithRepair };
