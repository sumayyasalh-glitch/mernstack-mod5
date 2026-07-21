const Product = require('../models/product');

const getRecommendations = async (req, res) => {
  try {
    // This endpoint accepts category preferences exported from RapidMiner's
    // association/clustering workflow. It remains useful when no export exists.
    const preferredCategories = String(req.query.categories || '').split(',').filter(Boolean);
    const query = preferredCategories.length ? { category: { $in: preferredCategories } } : {};
    let products = await Product.find(query).sort({ createdAt: -1 }).limit(4);
    if (products.length < 4 && preferredCategories.length) {
      const extras = await Product.find({ _id: { $nin: products.map((product) => product._id) } }).sort({ createdAt: -1 }).limit(4 - products.length);
      products = [...products, ...extras];
    }
    res.json({ source: 'RapidMiner-compatible category model', products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRecommendations };
