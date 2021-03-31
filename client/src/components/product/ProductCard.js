import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/actions/cart";
import Rating from "../common/Rating";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductCard(props) {
  const { product } = props;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    try {
      dispatch(addToCart(product._id, 1));

      toast.success("Add to cart successfully.");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="card p-0 m-2" key={product._id} style={{ width: "15rem" }}>
      <ToastContainer position="bottom-right" />
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <div className="card-body" key={product._id}>
        <Link
          to={`/product/${product._id}`}
          className="text-decoration-none text-reset fs-6"
        >
          {product.name}
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />

        <div className="row p-0 mt-2">
          <div className="col-auto me-auto">
            <div className="card-text fs-5">${product.price}</div>
          </div>
          <div className="col-auto">
            <button
              className="btn btn-primary btn-sm"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
