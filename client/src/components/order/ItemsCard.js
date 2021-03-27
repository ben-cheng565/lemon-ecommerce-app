import React from "react";
import { Link } from "react-router-dom";

function ItemsCard({ orderItems }) {
  return (
    <div className="card shadow-sm mt-3">
      <div className="card-header">
        <span className="fs-5">Order Items</span>
      </div>
      <div className="card-body">
        <ul className="list-group list-group-flush ms-3 my-1">
          {orderItems.map((item) => (
            <li key={item.productId} className="list-group-item">
              <div className="row d-flex align-items-center">
                <div className="col-2">
                  <img
                    src={`../${item.image}`}
                    alt={item.name}
                    className="img-fluid"
                    style={{ width: "3rem" }}
                  />
                </div>
                <div className="col-7">
                  <Link
                    className="text-decoration-none fs-6"
                    to={`/product/${item.id}`}
                  >
                    {item.name}
                  </Link>
                </div>

                <div className="col-3">
                  {item.qty} x ${item.price} = ${item.qty * item.price}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ItemsCard;
