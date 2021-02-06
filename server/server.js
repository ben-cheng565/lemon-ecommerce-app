import express from "express";

import { data } from "./data.js";

const app = express();

// fetch the specific product detail
app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const product = data.products.find((p) => p._id === id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not Found" });
  }
});

//fetch all products
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

// test api
app.get("/", (req, res) => {
  res.send("Server is ready.");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
