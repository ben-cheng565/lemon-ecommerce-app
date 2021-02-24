import React from "react";
import Rating from "../../../common/Rating";

import "./ProductContent.css";

function ProductContent(props) {
  const { product } = props;
  const hostName = window.location.protocol + "//" + window.location.host;
  const imgUrl = /* hostName +  */ "../" + product.image;
  return (
    <>
      <div className="col-2">
        <img className="large" src={imgUrl} alt={product.name}></img>
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
    </>
  );
}

export default ProductContent;
