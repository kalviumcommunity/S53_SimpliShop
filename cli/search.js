const axios = require("axios");

require("dotenv").config();

const args = process.argv.slice(2);
const query = args.filter((a) => !a.startsWith("--")).join(" ");
const modeArg = args.find((a) => a.startsWith("--mode="));
const mode = modeArg ? modeArg.split("=")[1] : "zero-shot";

if (!query) {
  console.error("❌ Please provide a search query.");
  process.exit(1);
}

async function runSearch() {
  try {
    const response = await axios.post(`http://localhost:5001/api/search`, {
      query,
      mode,
    });

    const data = response.data;

    console.log("\n🔍 Query:", data.query);
    console.log("\n📌 Top Recommendation:");

    if (!data.recommendation || !data.recommendation.topRecommendation) {
      console.error(
        "❌ No valid recommendation returned. LLM raw output:",
        data.llm_raw
      );
      process.exit(1);
    }

    console.log(
      `   ${data.recommendation.topRecommendation.name} (${data.recommendation.topRecommendation.price})`
    );
    console.log(`   Why: ${data.recommendation.topRecommendation.why}`);

    console.log("\n📊 Summary:");
    console.log(data.recommendation.summary);

    console.log("\n✅ Matched Products:");
    data.recommendation.matchedProducts.forEach((p, idx) => {
      console.log(
        `   ${idx + 1}. ${p.name} - Score: ${p.score} | Reason: ${p.reason}`
      );
    });
  } catch (err) {
    console.error("❌ Error:", err.response?.data || err.message);
  }
}

runSearch();
