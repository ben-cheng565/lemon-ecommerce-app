import React from "react";

import "./CheckOutSteps.css";

function CheckOutSteps(props) {
  return (
    <div className="row d-flex justify-content-between m-3 checkout-steps">
      <div className={props.step1 ? "active" : ""}>Sign-In</div>
      <div className={props.step2 ? "active" : ""}>Shipping</div>
      <div className={props.step3 ? "active" : ""}>Payment</div>
      <div className={props.step4 ? "active" : ""}>Place Order</div>
    </div>
  );
}

export default CheckOutSteps;
