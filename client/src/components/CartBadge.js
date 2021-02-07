import React from "react";
import { useSelector } from "react-redux";

import "./CartBadge.css";

function CartBadge() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <>
      {cartItems.length > 0 && (
        <span className="badge">{cartItems.length}</span>
      )}
    </>
  );
}

export default CartBadge;
