import axios from "axios";
import {
  PRODUCTS_FAIL,
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
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
