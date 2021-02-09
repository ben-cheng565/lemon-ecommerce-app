import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../../redux/actions/cart";
import { signout } from "../../redux/actions/user";
import { CART_EMPTY } from "../../redux/actionTypes";
import CartBadge from "../cart/badge/CartBadge";

import "./NavBar.css";

function NavBar() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const signoutHandler = () => {
    //   sign out user account
    dispatch(signout());
    dispatch({ type: CART_EMPTY });

    // remove all cart contents
    /* if (cartItems) {
      for (let i = 0; i < cartItems.length; i++) {
        dispatch(removeFromCart(cartItems[i].id));
      }
    } */
  };

  return (
    <>
      <div>
        <Link className="brand" to="/">
          Dandelion
        </Link>
      </div>
      <div>
        <Link to="/cart">
          Cart
          <CartBadge cartItems={cartItems} />
        </Link>
        {userInfo ? (
          <div className="dropdown">
            <Link to="#">
              {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
            </Link>
            <ul className="dropdown-content">
              <Link to="/" onClick={signoutHandler}>
                Sign Out
              </Link>
            </ul>
          </div>
        ) : (
          <Link to="/signin">Sign In</Link>
        )}
      </div>
    </>
  );
}

export default NavBar;
