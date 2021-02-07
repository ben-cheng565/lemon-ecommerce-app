import express from "express";

import { data } from "../data.js";

const router = express.Router();

// fetch the specific product detail
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const product = data.products.find((p) => p._id === id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not Found" });
  }
});

//fetch all products
router.get("/", (req, res) => {
  res.send(data.products);
});

export default router;
