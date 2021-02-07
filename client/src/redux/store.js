import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import products from "./reducers/products";
import productDetail from "./reducers/productDetail";
import cart from "./reducers/cart";

const initState = {
  // read cart data from the local storage
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};
const reducer = combineReducers({
  products,
  productDetail,
  cart,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
