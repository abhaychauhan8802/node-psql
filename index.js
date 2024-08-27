require("dotenv").config();
const express = require("express");

const productRoute = require("./routes/product.route.js");
const categoryRoute = require("./routes/category.route.js");

const app = express();

app.use("/api/category", categoryRoute);

app.use("/api/product", productRoute);

app.listen(3000, () => console.log("Server is listen on post 3000"));
