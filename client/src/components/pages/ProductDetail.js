import React from "react";
import { Link } from "react-router-dom";
import { data } from "../../data";
import Rating from "../Rating";

import "./ProductDetail.css";

function ProductDetail(props) {
  const product = data.products.find((p) => p._id === props.match.params.id);
  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <div>
      <Link to="/">Go Back</Link>
      <div className="row top">
        <div className="col-2">
          <img className="large" src={product.image} alt={product.name}></img>
        </div>
        <div className="col-1">
          <ul>
            <li>
              <h1>{product.name}</h1>
            </li>
            <li>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </li>
            <li>Price : ${product.price}</li>
            <li>Description : {product.description}</li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <div className="row">
                  <div>Price</div>
                  <div className="price">${product.price}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Status</div>
                  <div>
                    {product.countInStock > 0 ? (
                      <span className="success">In Stock</span>
                    ) : (
                      <span className="error">Out of Stock</span>
                    )}
                  </div>
                </div>
              </li>
              <li>
                <button>Add to Cart</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;