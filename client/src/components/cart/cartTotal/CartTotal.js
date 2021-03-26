import React from "react";

// import "./CartTotal.css";

function CartTotal(props) {
  const { cartItems, checkoutHandler } = props;

  return (
    <div className="card card-body shadow-sm" style={{ width: "100%" }}>
      <ul className="list-unstyled">
        <li className="fs-5 my-4">
          Subtotal ({cartItems.reduce((accum, c) => accum + c.qty, 0)} items) :
          $ {cartItems.reduce((accum, c) => accum + c.price * c.qty, 0)}
        </li>
        <li className="d-grid gap-2 col-9 mx-auto pt-3">
          <button
            className="btn btn-primary"
            type="button"
            onClick={checkoutHandler}
            disabled={cartItems.length === 0}
          >
            Check Out
          </button>
        </li>
      </ul>
    </div>
  );
}

export default CartTotal;
