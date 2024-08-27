const router = require("express").Router();

const { getAllProducts } = require("../controllers/product.controller.js");

router.get("/products", getAllProducts);

module.exports = router;
