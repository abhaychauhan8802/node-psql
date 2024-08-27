const router = require("express").Router();

const { getAllCategories } = require("../controllers/category.controller.js");

router.get("/categories", getAllCategories);

module.exports = router;
