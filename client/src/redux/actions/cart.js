import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../actionTypes";

// add an item to cart
export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/products/${productId}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      productId: data._id,
      qty,
    },
  });

  //  store cartItems in the localStorage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// remove an item from cart
export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// save shipping address
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

// save payment method
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
