const router = require("express").Router();

const {
  getAllCategories,
  createCategory,
} = require("../controllers/category.controller.js");

router.get("/categories", getAllCategories);
router.post("/create-category", createCategory);

module.exports = router;
