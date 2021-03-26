import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckOutSteps from "../../components/cart/checkout/CheckOutSteps";
import LoadingBox from "../../components/common/LoadingBox";
import MessageBox from "../../components/common/MessageBox";
import { createOrder } from "../../redux/actions/order";
import { ORDER_CREATE_RESET } from "../../redux/actionTypes";

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
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      // dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  return (
    <div>
      <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
      <div className="container">
        <div className="row">
          <div className="col-8 ">
            <div className="card card-body mt-3 shadow-sm px-4">
              <span className="fs-4 mb-2">Shipping</span>
              <p>
                <strong>Name: </strong>
                {shippingAddress.fullName} <br />
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city},
                {shippingAddress.country}, {shippingAddress.postalCode}
              </p>
            </div>

            <div className="card card-body mt-2 shadow-sm px-4">
              <span className="fs-4 mb-2">Payment</span>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </div>

            <div className="card card-body mt-2 shadow-sm px-4">
              <span className="fs-4 mb-2">Order Items</span>
              <ul className="list-unstyled ms-3 my-1">
                {cartItems.map((item) => (
                  <li key={item.productId}>
                    <div className="row d-flex align-items-center">
                      <div className="col-2">
                        <img
                          src={item.image}
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
          <div className="col-4 mt-3">
            <div className="card card-body shadow px-4">
              <span className="fs-4 mb-2">Order Summary</span>

              <div className="row mb-1">
                <div className="col-6">Items Fee</div>
                <div className="col-6 d-flex justify-content-end">
                  ${cart.itemsPrice.toFixed(2)}
                </div>
              </div>

              <div className="row mb-1">
                <div className="col-6">Shipping Fee</div>
                <div className="col-6 d-flex justify-content-end">
                  ${cart.shippingPrice.toFixed(2)}
                </div>
              </div>

              <div className="row mb-1">
                <div className="col-6">Tax Fee</div>
                <div className="col-6 d-flex justify-content-end">
                  ${cart.taxPrice.toFixed(2)}
                </div>
              </div>

              <div className="row mb-1">
                <div className="col-6">
                  <strong>Order Total</strong>
                </div>
                <div className="col-6 d-flex justify-content-end">
                  <strong>${cart.totalPrice.toFixed(2)}</strong>
                </div>
              </div>

              <div className="d-grid gap-2 col-9 mx-auto pt-3 my-2">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={placeOrderHandler}
                  disabled={cartItems.length === 0}
                >
                  Place Order
                </button>
              </div>

              {loading && <LoadingBox />}
              {error && <MessageBox variant="danger" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
