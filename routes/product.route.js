const router = require("express").Router();

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductByCategory,
} = require("../controllers/product.controller.js");

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/category/:id", getProductByCategory);
router.post("/create-product", createProduct);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

module.exports = router;
