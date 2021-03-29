import React from "react";
import { Link } from "react-router-dom";
import Rating from "../common/Rating";

function ProductCard(props) {
  const { product } = props;

  return (
    <div className="card p-0 m-2" key={product._id} style={{ width: "15rem" }}>
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
            <a href="#" className="btn btn-primary btn-sm">
              Add to Cart
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
