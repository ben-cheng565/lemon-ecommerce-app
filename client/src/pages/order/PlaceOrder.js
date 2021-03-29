import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckOutSteps from "../../components/cart/checkout/CheckOutSteps";
import { createOrder } from "../../redux/actions/order";
import { ORDER_CREATE_RESET } from "../../redux/actionTypes";
import SummaryCard from "../../components/order/SummaryCard";
import ShippingCard from "../../components/order/ShippingCard";
import ItemsCard from "../../components/order/ItemsCard";
import PaymentCard from "../../components/order/PaymentCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PlaceOrder(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  if (!paymentMethod) {
    props.history.push("/payment");
  }

  const { order, loading, success, error } = useSelector(
    (state) => state.orderCreate
  );

  //   calculate each price
  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(cartItems.reduce((a, c) => a + c.qty * c.price, 0));
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10;
  cart.taxPrice = toPrice(cart.itemsPrice * 0.15);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cartItems }));

    dispatch({ type: ORDER_CREATE_RESET });
  };

  useEffect(() => {
    if (success) {
      toast.success("Order created successfully.");

      props.history.push(`/order/${order._id}`);
      // dispatch({ type: ORDER_CREATE_RESET });
    }
    if (error) {
      toast.error("Order created failed.");
    }
  }, [dispatch, order, props.history, success, error]);

  return (
    <>
      <div>
        <ToastContainer position="bottom-right" />
      </div>
      <div>
        <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
        <div className="container">
          <div className="row">
            <div className="col-8 ">
              <ShippingCard shippingAddress={shippingAddress} />

              <PaymentCard paymentMethod={paymentMethod} />

              <ItemsCard orderItems={cartItems} />
            </div>
            <div className="col-4 mt-3">
              <SummaryCard
                order={cart}
                orderItems={cartItems}
                loading={loading}
                error={error}
                isPlace="true"
                placeOrderHandler={placeOrderHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlaceOrder;
