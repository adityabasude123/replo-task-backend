
const express = require("express");
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getProductsByPrice,
  getProductsByRating,
  addReview
} = require("../controllers/productController");
const auth = require("../middlewares/auth");

router.post("/add", auth, addProduct);
router.get("/", getAllProducts);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);
router.get("/featured", getFeaturedProducts);
router.get("/price/:value", getProductsByPrice);
router.get("/rating/:value", getProductsByRating);
module.exports = router;
