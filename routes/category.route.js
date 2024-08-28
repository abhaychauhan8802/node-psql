const router = require("express").Router();

const {
  getAllCategories,
  createCategory,
  updateCategory,
} = require("../controllers/category.controller.js");

router.get("/categories", getAllCategories);
router.post("/create-category", createCategory);
router.put("/update-category", updateCategory);

module.exports = router;
