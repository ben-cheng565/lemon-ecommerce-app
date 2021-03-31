import React from "react";
import { Link } from "react-router-dom";

function UserMenu(props) {
  return (
    <ul className="dropdown-menu me-auto mb-2 dropdown-menu-dark">
      <li>
        <Link className="dropdown-item" to="/profile">
          <i className="fas fa-user-circle"></i> Profile
        </Link>
      </li>
      <li>
        <Link className="dropdown-item" to="/orderhistory">
          <i className="fas fa-history"></i> Orders
        </Link>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <li>
        <Link className="dropdown-item" to="/" onClick={props.signoutHandler}>
          <i className="fas fa-sign-out-alt"></i> Sign Out
        </Link>
      </li>
    </ul>
  );
}

export default UserMenu;
