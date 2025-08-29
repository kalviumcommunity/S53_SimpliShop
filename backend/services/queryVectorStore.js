const products = require("../data/products.json");

const queryVectorStore = async (query) => {
    return products.filter(p => p.category.toLowerCase().includes(query.toLowerCase()));
};

module.exports = { queryVectorStore };