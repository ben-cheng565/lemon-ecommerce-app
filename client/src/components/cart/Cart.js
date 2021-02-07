import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../../redux/actions/cart";
import MessageBox from "../common/MessageBox";

import "./Cart.css";
import CartItem from "./cartItem/CartItem";
import CartTotal from "./cartTotal/CartTotal";

function Cart(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                removeFromCartHandler={removeFromCartHandler}
              />
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <CartTotal cartItems={cartItems} checkoutHandler={checkoutHandler} />
      </div>
    </div>
  );
}

export default Cart;
