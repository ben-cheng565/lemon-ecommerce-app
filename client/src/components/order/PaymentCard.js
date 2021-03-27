import React from "react";
import MessageBox from "../common/MessageBox";

function PaymentCard({ paymentMethod, order, isDeliver }) {
  return (
    <div className="card mt-3 shadow-sm">
      <div className="card-header">
        <span className="fs-5">Payment</span>
      </div>

      <div className="card-body ms-4">
        <div className="mb-2">
          <strong>Method: </strong>
          {paymentMethod}
        </div>

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
    </div>
  );
}

export default PaymentCard;
