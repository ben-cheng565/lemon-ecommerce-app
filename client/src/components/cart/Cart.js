import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../../redux/actions/cart";
import MessageBox from "../common/MessageBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import "./Cart.css";
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
    try {
      dispatch(removeFromCart(id));

      toast.success("Remove from cart successfully.");
    } catch (error) {
      toast.error(error);
    }
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <>
      <div>
        <ToastContainer position="bottom-right" />
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 m-3">
            <p className="fs-4">Shopping Cart</p>
            {cartItems.length === 0 ? (
              <MessageBox>
                Cart is empty. <Link to="/">Go Shopping</Link>
              </MessageBox>
            ) : (
              <ul className="list-group list-group-flush">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.productId}
                    item={item}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
              </ul>
            )}
          </div>
          <div className="col-9 col-md-3 mt-5 ">
            <CartTotal
              cartItems={cartItems}
              checkoutHandler={checkoutHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
