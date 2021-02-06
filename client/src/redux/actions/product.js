import axios from "axios";
import {
  PRODUCTS_FAIL,
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
} from "../actionTypes";

export const fetchProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCTS_REQUEST,
  });

  try {
    const { data } = await axios.get("/api/products");
    dispatch({ type: PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCTS_FAIL, payload: error.message });
  }
};

export const fetchProductDetail = (productId) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DETAIL_REQUEST,
  });

  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
