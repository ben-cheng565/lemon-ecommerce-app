import React from "react";
import { Link } from "react-router-dom";

function AdminMenu(props) {
  return (
    <ul className="dropdown-menu me-auto mb-2 dropdown-menu-dark">
      <li>
        <Link className="dropdown-item" to="/productlist">
          <i className="fas fa-boxes"></i> Products
        </Link>
      </li>
      <li>
        <Link className="dropdown-item" to="/orderlist">
          <i className="fas fa-history"></i> Orders
        </Link>
      </li>
      <li>
        <Link className="dropdown-item" to="/userlist">
          <i className="fas fa-users-cog"></i> Users
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

export default AdminMenu;
