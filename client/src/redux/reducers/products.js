import {
  PRODUCTS_FAIL,
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
} from "../actionTypes";

const products = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCTS_REQUEST:
      return { loading: true };
    case PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default products;
