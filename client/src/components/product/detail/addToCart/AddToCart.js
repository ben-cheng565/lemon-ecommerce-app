import React from "react";

// import "./AddToCart.css";

function AddToCart(props) {
  const { product, qty, setQty, addToCartHandler } = props;

  return (
    <div className="card card-body shadow-sm px-4" style={{ width: "90%" }}>
      <div className="row px-1 mb-2">
        <div className="col-6">Price</div>
        <div className="col-6 text-end" style={{ color: "#b22b09" }}>
          ${product.price}
        </div>
      </div>

      <div className="row px-1 mb-2">
        <div className="col-6">Status</div>
        <div className="col-6 text-end">
          {product.countInStock > 0 ? (
            <span style={{ color: "#20a020" }}>In Stock</span>
          ) : (
            <span style={{ color: "#a02020" }}>Out of Stock</span>
          )}
        </div>
      </div>

      <div className="row px-1">
        <div className="col-6">Qty</div>
        <div className="col-6 d-flex justify-content-end">
          <select
            className="form-select"
            style={{ width: "auto", cursor: "pointer" }}
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

      <div className="d-grid gap-2 col-9 mx-auto my-3">
        <button
          className="btn btn-primary"
          onClick={addToCartHandler}
          disabled={product.countInStock === 0}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default AddToCart;
