import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import LoadingBox from "../../../../components/common/LoadingBox";
import MessageBox from "../../../../components/common/MessageBox";
import SummaryCard from "../../../../components/order/SummaryCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from "../../../../redux/actions/order";
import {
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../../../../redux/actionTypes";
import ShippingCard from "../../../../components/order/ShippingCard";
import ItemsCard from "../../../../components/order/ItemsCard";
import PaymentCard from "../../../../components/order/PaymentCard";

function OrderDetails(props) {
  const orderId = props.match.params.id;
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const {
    error: errorPay,
    success: successPay,
    loading: loadingPay,
  } = useSelector((state) => state.orderPay);
  const {
    error: errorDeliver,
    success: successDeliver,
    loading: loadingDeliver,
  } = useSelector((state) => state.orderDeliver);
  const dispatch = useDispatch();

  useEffect(() => {
    // create paypal script
    const addPayPalScript = async () => {
      const { data } = await axios.get("/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkLoaded(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkLoaded(true);
        }
      }
    }

    if (errorDeliver) {
      toast.error(errorDeliver);
    }
    if (errorPay) {
      toast.error(errorPay);
    }
    if (successDeliver) {
      toast.success("Order delivered successfully.");
    }
    if (successPay) {
      toast.success("Order paid successfully.");
    }
  }, [
    dispatch,
    order,
    orderId,
    successPay,
    successDeliver,
    errorPay,
    errorDeliver,
  ]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const deliverHandler = (orderId) => {
    dispatch(deliverOrder(orderId));
  };

  return (
    <>
      <div>
        <ToastContainer position="bottom-right" />
      </div>

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger" />
      ) : (
        <div className="container mt-3">
          <span className="fs-4">Order: {order._id}</span>
          <div className="row">
            <div className="col-md-8">
              <ShippingCard
                shippingAddress={order.shippingAddress}
                order={order}
                isDeliver="true"
              />

              <PaymentCard
                paymentMethod={order.paymentMethod}
                order={order}
                isDeliver="true"
              />

              <ItemsCard orderItems={order.orderItems} />
            </div>

            <div className="col-md-4 mt-3">
              <SummaryCard
                order={order}
                userInfo={userInfo}
                sdkLoaded={sdkLoaded}
                errorPay={errorPay}
                loadingPay={loadingPay}
                isDeliver="true"
                deliverHandler={deliverHandler}
                successPaymentHandler={successPaymentHandler}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderDetails;
