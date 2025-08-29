function buildZeroShotPrompt(query, productsSlice) {
  return `
You are SimpliShop, an expert shopping assistant. The user asks: "${query}"

Here are candidate products (JSON array). Each product has id, name, brand, category, price, pros, cons, tags, description:
${JSON.stringify(productsSlice, null, 2)}

Task:
1) Identify up to 6 products most relevant to the user's query.
2) Return ONLY valid JSON, with this exact structure (no extra text, no code fences):

{
  "matchedProducts":[ {"id":"string","name":"string","reason":"string","score":0.0} ],
  "summary":"string",
  "topRecommendation":{"id":"string","name":"string","price":"string","why":"string"}
}
`;
}

const ONE_SHOT_EXAMPLE = `Example:
{
  "matchedProducts":[
    {"id":"p1", "name":"Sony WH-CH510", "reason":"Affordable, good battery life, lightweight", "score":0.85}
  ],
  "summary":"Sony WH-CH510 is a good budget-friendly headphone with long battery life and lightweight design.",
  "topRecommendation":{"id":"p1","name":"Sony WH-CH510","price":"$59","why":"Affordable and lightweight, suitable for everyday use."}
}
`;

function buildOneShotPrompt(query, productsSlice) {
  return `
You are SimpliShop, an expert shopping assistant.
${ONE_SHOT_EXAMPLE}

Now the user asks: "${query}"

Candidate products:
${JSON.stringify(productsSlice, null, 2)}

Task:
- Select the most relevant products from the candidates.
- Return ONLY valid JSON matching the same structure as the example.
- Do not create products not listed in the candidates.
`;
}

module.exports = { buildZeroShotPrompt, buildOneShotPrompt };
