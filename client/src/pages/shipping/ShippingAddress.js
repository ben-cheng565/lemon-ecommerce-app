import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckOutSteps from "../../components/cart/checkout/CheckOutSteps";
import { saveShippingAddress } from "../../redux/actions/cart";

function ShippingAddress(props) {
  // if have not signed in, go to signin page
  const { userInfo } = useSelector((state) => state.user);
  if (!userInfo) {
    props.history.push("/signin");
  }

  let prevInfo = {
    fullName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
  };
  //   get previous shipping address data
  const { shippingAddress } = useSelector((state) => state.cart);
  if (shippingAddress) {
    prevInfo = shippingAddress;
  }
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState(prevInfo.fullName);
  const [address, setAddress] = useState(prevInfo.address);
  const [city, setCity] = useState(prevInfo.city);
  const [country, setCountry] = useState(prevInfo.country);
  const [postalCode, setPostalCode] = useState(prevInfo.postalCode);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingAddress({ fullName, address, city, country, postalCode })
    );

    props.history.push("/payment");
  };

  return (
    <div>
      <CheckOutSteps step1 step2></CheckOutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label />
          <button type="submit">Continue</button>
        </div>
      </form>
    </div>
  );
}

export default ShippingAddress;
