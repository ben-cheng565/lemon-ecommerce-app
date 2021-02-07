import express from "express";
import mongoose from "mongoose";

import userRouter from "./routers/users.js";
import productsRouter from "./routers/products.js";

const app = express();

// connect to mongo db
mongoose
  .connect(
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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
