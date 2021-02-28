import mongoose from "mongoose";

const productsSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    countInStock: { type: Number, default: 0 },
    rating: { type: Number },
    numReviews: { type: Number },
  },
  { timestamps: true }
);

const Product = mongoose.model("Products", productsSchema);
export default Product;
