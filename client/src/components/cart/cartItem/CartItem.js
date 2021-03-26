import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart } from "../../../redux/actions/cart";
// import "./CartItem.css";

function CartItem(props) {
  const dispatch = useDispatch();
  const { item, removeFromCartHandler } = props;

  return (
    <li key={item.productId} className="list-group-item">
      <div className="row d-flex align-items-center">
        <div className="col-2">
          <img
            src={`../${item.image}`}
            alt={item.name}
            className="img-fluid"
            style={{ width: "4rem" }}
          />
        </div>
        <div className="col-6">
          <Link
            className="text-decoration-none fs-6"
            to={`/product/${item.productId}`}
          >
            Name: {item.name}
          </Link>
          <p style={{ fontSize: ".8rem", color: "#b22b09" }}>
            Price: ${item.price}
          </p>
        </div>
        <div className="col-2">
          <select
            className="form-select"
            style={{ width: "auto", cursor: "pointer" }}
            value={item.qty}
            onChange={(e) =>
              dispatch(addToCart(item.productId, Number(e.target.value)))
            }
          >
            {[...Array(item.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="col-2">
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={() => removeFromCartHandler(item.productId)}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
