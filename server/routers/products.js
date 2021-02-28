import express from "express";
import Product from "../models/products.js";
import { isAdmin, isAuth } from "../util.js";

const router = express.Router();

export const dummyData = {
  products: [
    {
      name: "NBA Lakers Jersey",
      category: "Shirts",
      image: "/images/p1.png",
      price: 120,
      brand: "Nike",
      rating: 5,
      numReviews: 122,
      description: "Lebron James No.23",
      countInStock: 10,
    },
    {
      name: "NBA Lakers Bag",
      category: "Bag",
      image: "../uploads/1613871107031.jpg",
      price: 150,
      brand: "Nike",
      rating: 5,
      numReviews: 12,
      description: "45cm * 31cm * 15cm",
      countInStock: 0,
    },
    {
      name: "NBA Lakers Sweatshirt",
      category: "Sweatshirt",
      image: "../uploads/1613871471036.jpg",
      price: 120,
      brand: "Nike",
      rating: 5,
      numReviews: 5,
      description: "Pullover fleece sweatshirt hoodie",
      countInStock: 1,
    },
    {
      name: "NBA Lakers Dri-Fit",
      category: "Shirt",
      image: "../uploads/1613870905165.jpgg",
      price: 100,
      brand: "Nike",
      rating: 5,
      numReviews: 10,
      description: "Lakers, AT1001-010",
      countInStock: 5,
    },
  ],
};

// init products data
router.get("/init", async (req, res) => {
  // before initializing data, delete all product data in db
  await Product.remove({});

  const createdProducts = await Product.insertMany(dummyData.products);

  res.send({ createdProducts });
});

//fetch product categories
router.get("/categories", async (req, res) => {
  const categories = await Product.find().distinct("category");
  res.send(categories);
});

// fetch the specific product detail
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not Found" });
  }
});

//fetch all products
router.get("/", async (req, res) => {
  const name = req.query.name || "";
  const category = req.query.category || "";
  const sort = req.query.sort || "";
  const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
  const categoryFilter = category ? { category } : {};
  const sortOrder =
    sort === "priceAsc"
      ? { price: 1 }
      : sort === "priceDesc"
      ? { price: -1 }
      : { _id: -1 };

  const products = await Product.find({
    ...nameFilter,
    ...categoryFilter,
  }).sort(sortOrder);

  res.send(products);
});

router.post("/", isAuth, isAdmin, async (req, res) => {
  const product = new Product({
    name: "sample",
    image: "/images/p1.jpg",
    price: 0,
    category: "sample",
    brand: "sample",
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    description: "sample",
  });

  const result = await product.save();
  res.send({ message: "Product created successfully.", product: result });
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name;
    product.image = req.body.image;
    product.price = req.body.price;
    product.category = req.body.category;
    product.brand = req.body.brand;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;

    const result = await product.save();
    res.send({ message: "Product updated successfully", product: result });
  } else {
    res.status(404).send("Product not Found");
  }
});

router.delete("/:id", isAuth, async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  if (product) {
    const result = await product.remove();
    res.send({ message: "Product deleted successfully", product: result });
  } else {
    res.status(404).send("Product not Found");
  }
});

router.post("/reviews/:id", isAuth, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    const review = {
      userId: req.body.userId,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((accum, cur) => cur.rating + accum, 0) /
      product.reviews.length;

    const result = await product.save();
    res.send({
      message: "Review created successfully",
      review: result.reviews[product.reviews.length - 1],
    });
  } else {
    res.status(404).send("Product not Found");
  }
});

export default router;
