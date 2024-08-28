const router = require("express").Router();

const {
  getAllProducts,
  createProduct,
} = require("../controllers/product.controller.js");

router.get("/products", getAllProducts);
router.post("/create-product", createProduct);

module.exports = router;
