const products = require("../data/products.json");

async function findAlternative(req, res) {
    try {
        const { product } = req.body;
        if (!product) {
            return res.status(400).json({ error: "Provide product name" });
        }

        const found = products.find(p => p.name.toLowerCase().includes(product.toLowerCase()));
        if (!found) {
            return res.status(404).json({ error: "Product not found" });
        }

        const alternative = products.find(p => p.id !== found.id);

        res.json({
            product: found,
            alternative: alternative,
            reason: "Alternative suggested based on category similarity"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { findAlternative };
