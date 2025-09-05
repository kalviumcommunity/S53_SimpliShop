import { pipeline } from "@xenova/transformers";
const extractEmbeddings = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2"
);
export async function embedOne(text) {
  const embedding = await extractEmbeddings(text, {
    pooling: "mean",
    normalize: true,
  });
  return embedding.data;
}
export async function embedMany(texts) {
  const results = [];
  for (const t of texts) {
    const e = await extractEmbeddings(t, {
      pooling: "mean",
      normalize: true,
    });
    results.push(e.data);
  }
  return results;
}
