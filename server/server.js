import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";

import userRouter from "./routers/users.js";
import productsRouter from "./routers/products.js";
import orderRouter from "./routers/orders.js";
import uploadRouter from "./routers/uploads.js";

// read environment parameters from .env
dotenv.config();

const app = express();

app.use(bodyParser.json());

// connect to mongo db
mongoose
  .connect(
    process.env.MONGODB_URL ||
      "mongodb+srv://user1:user1@cluster0.thms6.mongodb.net/ecommerceApp?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    console.log("Mongodb connected successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/users", userRouter);
app.use("/products", productsRouter);
app.use("/orders", orderRouter);
app.use("/uploads", uploadRouter);
// fetch paypal client id from env file
app.get("/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/client/build/index.html'))


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
