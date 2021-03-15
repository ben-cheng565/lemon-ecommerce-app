import React from "react";

// import "./CartTotal.css";

function CartTotal(props) {
  const { cartItems, checkoutHandler } = props;

  return (
    <div className="card card-body">
      <ul>
        <li>
          <h2>
            Subtotal ({cartItems.reduce((accum, c) => accum + c.qty, 0)} items)
            : $ {cartItems.reduce((accum, c) => accum + c.price * c.qty, 0)}
          </h2>
        </li>
        <li>
          <button
            // className="checkout"
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
