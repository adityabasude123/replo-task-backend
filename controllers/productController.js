const productSchema = require("../models/productSchema");
const { v4: uuidv4 } = require("uuid");

const addProduct = async (req, res) => {
  const { name, price, featured, company, rating } = req.body;
  try {
    if (!name || !price || !company || rating === undefined) {
      return res.status(400).json({
        msg: "All fields are required",
      });
    }

    if (isNaN(price) || isNaN(rating)) {
      return res.status(400).json({
        msg: "Price and Rating must be numbers",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        msg: "Rating must be between 1 and 5",
      });
    }

    await productSchema.create({
      productId: uuidv4(),
      name,
      price,
      featured,
      rating,
      company,
    });

    res.status(201).json({
      msg: "Product successfully added",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productSchema.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, featured, company } = req.body;

  try {
    const product = await productSchema.findOne({ productId: id });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.featured = featured || product.featured;
    product.company = company || product.company;

    await product.save();

    res.status(200).json({ msg: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productSchema.findOneAndDelete({ productId: id });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await productSchema.find({ featured: true });
    res.status(200).json(featuredProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductsByPrice = async (req, res) => {
  const { value } = req.params;

  try {
    const products = await productSchema.find({ price: { $lt: value } });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductsByRating = async (req, res) => {
  const { value } = req.params;

  try {
    const products = await productSchema.find({ rating: { $gt: value } });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getProductsByPrice,
  getProductsByRating,
};
