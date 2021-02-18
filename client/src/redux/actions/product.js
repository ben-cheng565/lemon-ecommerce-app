import axios from "axios";
import {
  PRODUCTS_FAIL,
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
} from "../actionTypes";

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: PRODUCTS_REQUEST });

  try {
    const { data } = await axios.get("/products");
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
    const { data } = await axios.get(`/products/${productId}`);
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

export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });

  const {
    user: { userInfo },
  } = getState();

  try {
    const { data } = await axios.post(
      "/products",
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
