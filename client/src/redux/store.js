import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import products from "./reducers/products";

const initState = {};
const reducer = combineReducers({
  products,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
