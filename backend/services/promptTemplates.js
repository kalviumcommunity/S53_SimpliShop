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

exports.buildZeroShotPrompt = buildZeroShotPrompt;