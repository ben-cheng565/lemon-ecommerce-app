import React from "react";
import MessageBox from "../common/MessageBox";

function ShippingCard({ shippingAddress, order, isDeliver }) {
  return (
    <div className="card card-body mt-3 shadow-sm px-4">
      <span className="fs-4 mb-2">Shipping</span>
      <p>
        <strong>Name: </strong>
        {shippingAddress.fullName} <br />
        <strong>Address: </strong>
        {shippingAddress.address}, {shippingAddress.city},
        {shippingAddress.country}, {shippingAddress.postalCode}
      </p>

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
  );
}

export default ShippingCard;
