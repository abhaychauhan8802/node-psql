const { pool } = require("../services/database.js");

exports.getAllCategories = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM category");

    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createCategory = async (req, res) => {
  const name = req.body.name;

  try {
    if (!name) {
      return res.status(422).json({ error: "Name is required" });
    }

    const isExist = await pool.query({
      text: "SELECT EXISTS (SELECT * FROM category WHERE name = $1)",
      values: [name],
    });

    if (isExist.rows[0].exists) {
      return res.status(409).json({ error: `Category ${name} already exist` });
    }

    const result = await pool.query({
      text: "INSERT INTO category(name) VALUES($1) RETURNING *",
      values: [name],
    });

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.json(error);
  }
};
