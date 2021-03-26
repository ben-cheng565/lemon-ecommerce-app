import React from "react";
import MessageBox from "../common/MessageBox";

function PaymentCard({ paymentMethod, order, isDeliver }) {
  return (
    <div className="card card-body mt-2 shadow-sm px-4">
      <span className="fs-4 mb-2">Payment</span>
      <p>
        <strong>Method: </strong>
        {paymentMethod}
      </p>

      {isDeliver ? (
        order.isPaid ? (
          <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
        ) : (
          <MessageBox variant="danger">Not Paid</MessageBox>
        )
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default PaymentCard;
