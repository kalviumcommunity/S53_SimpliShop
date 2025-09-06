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
  const output = await extractor(texts, {
    pooling: "mean",
    normalize: true,
  });

  if (Array.isArray(output)) {
    return output.map((e) => Array.from(e.data));
  }

  if (output && output.data) {
    const dim = output.dims?.[1] ?? output.data.length / texts.length;
    const results = [];
    for (let i = 0; i < texts.length; i++) {
      results.push(
        Array.from(output.data.slice(i * dim, (i + 1) * dim))
      );
    }
    return results;
  }

  throw new Error("Unexpected embeddings format from extractor");
}
