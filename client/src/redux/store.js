import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import products from "./reducers/products";
import productDetail from "./reducers/productDetail";
import cart from "./reducers/cart";
import user from "./reducers/user";
import {
  orderCreate,
  orderDetails,
  orderPay,
  orderHistory,
} from "./reducers/order";

const initState = {
  // read user signin data from the local storage
  user: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },

  // read cart data from the local storage
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "Paypal",
  },
};

const reducer = combineReducers({
  products,
  productDetail,
  cart,
  user,
  orderCreate,
  orderDetails,
  orderPay,
  orderHistory,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
