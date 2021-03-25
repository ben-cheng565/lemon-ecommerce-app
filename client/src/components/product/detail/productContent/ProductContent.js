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
      <div className="container">
        <div className="row">
          <div className="col-6">
            <img
              className="img-thumbnail"
              src={imgUrl}
              alt={product.name}
            ></img>
          </div>
          <div className="col-6 mb-auto">
            <ul className="list-group list-group-flush">
              <li className="list-group-item fs-4">{product.name}</li>
              <li className="list-group-item">
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </li>

              <li className="list-group-item fs-5" style={{ color: "#b22b09" }}>
                Price: ${product.price}
              </li>
              <li className="list-group-item">
                <span className="fs-5">Description: </span>
                <p>{product.description}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductContent;
