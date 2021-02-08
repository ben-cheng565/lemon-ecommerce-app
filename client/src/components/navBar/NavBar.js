import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../../redux/actions/user";
import CartBadge from "../cart/badge/CartBadge";

import "./NavBar.css";

function NavBar() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);

  const signoutHandler = () => {
    dispatch(signout());
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
          <CartBadge />
        </Link>
        {userInfo ? (
          <div className="dropdown">
            <Link to="#">
              {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
            </Link>
            <ul className="dropdown-content">
              <Link to="#signout" onClick={signoutHandler}>
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
