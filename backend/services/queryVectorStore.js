import products from "../data/products.json" with { type: "json" };

const queryVectorStore = async (query) => {
  return products.filter((p) =>
    p.category.toLowerCase().includes(query.toLowerCase())
  );
};

export {
  queryVectorStore,
};
