const axios = require("axios");

const query = process.argv.slice(2).join(" ");
if (!query) {
  console.error("❌ Please provide a search query.");
  process.exit(1);
}

async function runSearch() {
  try {
    const response = await axios.post("http://localhost:5001/api/search", {
      query
    });

    const data = response.data;

    console.log("\n🔍 Query:", data.query);
    console.log("\n📌 Top Recommendation:");
    console.log(`   ${data.recommendation.topRecommendation.name} ($${data.recommendation.topRecommendation.price})`);
    console.log(`   Why: ${data.recommendation.topRecommendation.why}`);

    console.log("\n📊 Summary:");
    console.log(data.recommendation.summary);

    console.log("\n✅ Matched Products:");
    data.recommendation.matchedProducts.forEach((p, idx) => {
      console.log(`   ${idx + 1}. ${p.name} - Score: ${p.score} | Reason: ${p.reason}`);
    });

  } catch (err) {
    console.error("❌ Error:", err.response?.data || err.message);
  }
}

runSearch();
