import { pipeline } from "@xenova/transformers";

let extractEmbeddings;

async function getExtractor() {
  if (!extractEmbeddings) {
    extractEmbeddings = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }
  return extractEmbeddings;
}

export async function embedOne(text) {
  const extractor = await getExtractor();
  const embedding = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });
  return Array.from(embedding.data);
}

export async function embedMany(texts) {
  const extractor = await getExtractor();
  const results = [];
  for (const t of texts) {
    const e = await extractor(t, {
      pooling: "mean",
      normalize: true,
    });
    results.push(Array.from(e.data));
  }
  return results;
}
