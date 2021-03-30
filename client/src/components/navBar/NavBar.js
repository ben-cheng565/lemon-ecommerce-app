import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import { signout } from "../../redux/actions/user";
import { CART_EMPTY } from "../../redux/actionTypes";
import CartBadge from "../cart/badge/CartBadge";
import SearchBox from "../search/SearchBox";
import AdminMenu from "./menu/AdminMenu";
import UserMenu from "./menu/UserMenu";

// import "./NavBar.css";

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
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Dandelion e-shop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav navbar-nav-scroll ms-auto">
              {userInfo ? (
                <li class="nav-item dropdown">
                  <Link
                    class="nav-link dropdown-toggle active"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    Hello, {userInfo.name}
                  </Link>
                  {!userInfo.isAdmin && (
                    <UserMenu signoutHandler={signoutHandler} />
                  )}
                  {userInfo.isAdmin && (
                    <AdminMenu signoutHandler={signoutHandler} />
                  )}
                </li>
              ) : (
                <Link className="nav-link active" to="/signin">
                  Sign In
                </Link>
              )}
              <li className="nav-item">
                <Link to="/cart" className="nav-link active">
                  <i class="fas fa-shopping-cart"></i> Cart
                  <CartBadge cartItems={cartItems} />
                </Link>
              </li>
            </ul>
            {/* <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
              />
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
