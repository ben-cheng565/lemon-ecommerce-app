import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import LoadingBox from "../common/LoadingBox";
import MessageBox from "../common/MessageBox";

function SummaryCard(props) {
  return (
    <div className="card shadow ">
      <div className="card-header">
        <span className="fs-5">Order Summary</span>
      </div>
      <div className="card-body px-4">
        <div className="row mb-2">
          <div className="col-6">Items Fee</div>
          <div className="col-6 d-flex justify-content-end">
            ${props.order.itemsPrice.toFixed(2)}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-6">Shipping Fee</div>
          <div className="col-6 d-flex justify-content-end">
            ${props.order.shippingPrice.toFixed(2)}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-6">Tax Fee</div>
          <div className="col-6 d-flex justify-content-end">
            ${props.order.taxPrice.toFixed(2)}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-6">
            <strong>Order Total</strong>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <strong>${props.order.totalPrice.toFixed(2)}</strong>
          </div>
        </div>
        {props.isDeliver && !props.order.isPaid && (
          <div>
            {!props.sdkLoaded ? (
              <LoadingBox />
            ) : (
              <div className="mt-3">
                {props.errorPay && (
                  <MessageBox variant="danger">{props.errorPay}</MessageBox>
                )}

                <PayPalButton
                  amount={props.order.totalPrice}
                  onSuccess={props.successPaymentHandler}
                />
              </div>
            )}
          </div>
        )}
        {props.isPlace && (
          <div className="d-grid gap-2 col-9 mx-auto pt-3 my-2">
            <button
              className="btn btn-primary"
              type="button"
              onClick={props.placeOrderHandler}
              disabled={props.orderItems.length === 0}
            >
              Place Order
            </button>
          </div>
        )}
        {props.isDeliver &&
          props.userInfo.isAdmin &&
          props.order.isPaid &&
          !props.order.isDelivered && (
            <div className="d-grid gap-2 col-9 mx-auto pt-3 my-2">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => props.deliverHandler(props.order._id)}
              >
                Deliver Order
              </button>
            </div>
          )}
      </div>
    </div>
  );
}

export default SummaryCard;
