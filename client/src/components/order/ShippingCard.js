import React from "react";
import MessageBox from "../common/MessageBox";

function ShippingCard({ shippingAddress, order, isDeliver }) {
  return (
    <div className="card mt-3 shadow-sm">
      <div className="card-header">
        <span className="fs-5 mb-2">Shipping</span>
      </div>
      <div className="card-body ms-4">
        <div className="mb-2">
          <strong>Name: </strong>
          {shippingAddress.fullName} <br />
        </div>
        <div className="mb-2">
          <strong>Address: </strong>
          {shippingAddress.address}, {shippingAddress.city},
          {shippingAddress.country}, {shippingAddress.postalCode}
        </div>

        {isDeliver ? (
          order.isDelivered ? (
            <MessageBox variant="success">
              Delivered at {order.deliveredAt}
            </MessageBox>
          ) : (
            <MessageBox variant="danger">Not Delivered</MessageBox>
          )
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default ShippingCard;
