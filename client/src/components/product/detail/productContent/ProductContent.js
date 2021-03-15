import React from "react";
import Rating from "../../../common/Rating";
import AddToCart from "../addToCart/AddToCart";

// import "./ProductContent.css";

function ProductContent(props) {
  const { product } = props;
  const hostName = window.location.protocol + "//" + window.location.host;
  const imgUrl = /* hostName +  */ "../" + product.image;
  return (
    <>
      <div className="container m-3">
        <div className="row">
          <div className="col-6 mr-2">
            <img
              className="img-thumbnail"
              src={imgUrl}
              alt={product.name}
            ></img>
          </div>
          <div className="col-6 mb-auto">
            <ul>
              <li className="fs-4">{product.name}</li>
              <li>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </li>

              <li className="fs-5" style={{ color: "#b22b09" }}>
                Price: ${product.price}
              </li>
              <li>Description: {product.description}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductContent;
