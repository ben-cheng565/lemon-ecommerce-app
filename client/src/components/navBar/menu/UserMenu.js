import React from "react";
import { Link } from "react-router-dom";

function UserMenu(props) {
  return (
    <ul class="dropdown-menu me-auto mb-2 dropdown-menu-dark">
      <li>
        <Link className="dropdown-item" to="/profile">
          <i class="fas fa-user-circle"></i> Profile
        </Link>
      </li>
      <li>
        <Link className="dropdown-item" to="/orderhistory">
          <i class="fas fa-history"></i> Orders
        </Link>
      </li>
      <li>
        <hr class="dropdown-divider" />
      </li>
      <li>
        <Link className="dropdown-item" to="/" onClick={props.signoutHandler}>
          <i class="fas fa-sign-out-alt"></i> Sign Out
        </Link>
      </li>
    </ul>
  );
}

export default UserMenu;
