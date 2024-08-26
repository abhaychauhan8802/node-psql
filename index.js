require("dotenv").config();
const express = require("express");
const { pool } = require("./services/database.js");

const app = express();

app.get("/categories", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM category");

    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.get("/products", async (req, res) => {
  try {
    const result = await pool.query(`
        SELECT p.id ,p."name",p.description,p.price,p.currency,p.quantity ,p.active,p.created_date,p.updated_date,
	        (SELECT ROW_TO_JSON(category_obj) FROM (
		        SELECT id,name FROM category c WHERE id = p.category_id
	        ) category_obj) AS category
        FROM product p
        `);

    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.listen(3000, () => console.log("Server is listen on post 3000"));
