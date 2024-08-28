const { pool } = require("../services/database.js");

exports.getAllProducts = async (req, res) => {
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
};

exports.createProduct = async (req, res) => {
  const { name, description, price, currency, quantity, active, category_id } =
    req.body;

  try {
    if (!name) {
      return res.status(422).json({ error: "name is required" });
    }

    if (!price) {
      return res.status(422).json({ error: "price is required" });
    }

    if (!category_id) {
      return res.status(422).json({ error: "category is required" });
    } else {
      const isExist = await pool.query({
        text: `SELECT EXISTS (SELECT * FROM category WHERE id = $1)`,
        values: [category_id],
      });

      if (!isExist.rows[0].exists) {
        return res.status(422).json({ error: "Category not exist" });
      }
    }

    const result = await pool.query({
      text: `INSERT INTO 
            product (name, description, price, currency, quantity, active, category_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
      values: [
        name,
        description ? description : null,
        price,
        currency ? currency : "USD",
        quantity ? quantity : 0,
        "active" in req.body ? active : true,
        category_id,
      ],
    });

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json(error);
  }
};
