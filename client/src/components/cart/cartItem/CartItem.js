import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart } from "../../../redux/actions/cart";
import "./CartItem.css";

function CartItem(props) {
  const dispatch = useDispatch();
  const { item, removeFromCartHandler } = props;

  return (
    <li key={item.productId}>
      <div className="row">
        <div>
          <img src={item.image} alt={item.name} className="small" />
        </div>
        <div className="min-30">
          <Link to={`/product/${item.productId}`}>{item.name}</Link>
        </div>
        <div>
          <select
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
        <div>${item.price}</div>
        <div>
          <button
            className="delete"
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
