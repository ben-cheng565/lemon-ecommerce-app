import React from "react";

import "./AddToCart.css";

function AddToCart(props) {
  const { product, qty, setQty, addToCartHandler } = props;

  return (
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
            <div className="row">
              <div>Qty</div>
              <div>
                <select
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  disabled={product.countInStock === 0}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </li>
          <li>
            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
            >
              Add to Cart
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AddToCart;
