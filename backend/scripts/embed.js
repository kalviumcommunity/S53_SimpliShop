import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import products from "../data/products.json" with { type: "json" };
import { embedMany } from "../services/embeddings.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const EMBEDDINGS_FILE = path.join(__dirname, "..", "data", "embeddings.json");

function productToText(p) {
    return `
        Name: ${p.name}.
        Brand: ${p.brand}.
        Category: ${p.category}.
        Description: ${p.description}.
        Price: $${p.price}.
        Specs: ${Object.entries(p.specs)
            .map(([k, v]) => `${k}: ${v}`)
            .join(", ")}.
        Pros: ${p.pros.join(", ")}.
        Cons: ${p.cons.join(", ")}.
        Tags: ${p.tags.join(", ")}.
    `.trim();
}

async function main() {
    const embeddings = await embedMany(products.map(productToText));
    const output = products.map((p, i) => ({
        ...p,
        embedding: embeddings[i],
    }));
    fs.writeFileSync(EMBEDDINGS_FILE, JSON.stringify(output, null, 2));
    console.log(`Wrote ${embeddings.length} embeddings to ${EMBEDDINGS_FILE}`);
}

main();
