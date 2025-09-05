import products from "../data/products.json" with { type: "json" };
async function compareProducts(req, res) {
  try {
    const { productA, productB } = req.body;
    if (!productA || !productB) {
      return res.status(400).json({
        error: "Provide productA and productB",
      });
    }
    const foundA = products.find((p) =>
      p.name.toLowerCase().includes(productA.toLowerCase())
    );
    const foundB = products.find((p) =>
      p.name.toLowerCase().includes(productB.toLowerCase())
    );
    if (!foundA || !foundB) {
      return res.status(404).json({
        error: "One or both products not found",
      });
    }
    res.json({
      productA: foundA,
      productB: foundB,
      comparison: {
        pros: ["Good build", "Affordable"],
        cons: ["Average battery life"],
        verdict: "Product A is slightly better for budget users",
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
export {
  compareProducts,
};
