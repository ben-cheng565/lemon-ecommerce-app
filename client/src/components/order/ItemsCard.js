import React from "react";
import { Link } from "react-router-dom";

function ItemsCard({ orderItems }) {
  return (
    <div className="card card-body mt-2 shadow-sm px-4">
      <span className="fs-4 mb-2">Order Items</span>
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
  );
}

export default ItemsCard;
