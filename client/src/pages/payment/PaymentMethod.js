import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckOutSteps from "../../components/cart/checkout/CheckOutSteps";
import { savePaymentMethod } from "../../redux/actions/cart";

// import "./PaymentMethod.css";

function PaymentMethod(props) {
  const { shippingAddress } = useSelector((state) => state.cart);
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }

  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));

    props.history.push("/placeorder");
  };

  return (
    <div>
      <CheckOutSteps step1 step2 step3 />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="Paypal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal">Paypal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <button type="submit">Continue</button>
        </div>
      </form>
    </div>
  );
}

export default PaymentMethod;
