import express from "express";
import Product from "../models/products.js";

import { data } from "../data.js";
import Products from "../models/products.js";

const router = express.Router();

// init products data
router.get("/init", async (req, res) => {
  // before initializing data, delete all product data in db
  await Product.remove({});

  const createdProducts = await Product.insertMany(data.products);

  res.send({ createdProducts });
});

// fetch the specific product detail
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Products.findById(id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not Found" });
  }
});

//fetch all products
router.get("/", async (req, res) => {
  const products = await Products.find({});
  res.send(products);
});

export default router;
