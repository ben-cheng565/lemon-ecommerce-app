import axios from "axios";
import {
  CART_EMPTY,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_HISTORY_REQUEST,
  ORDER_HISTORY_FAIL,
  ORDER_HISTORY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_SUCCESS,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from "../actionTypes";
import { errorMessage } from "../helpers/actionError";

// action for creating order
export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      user: { userInfo },
    } = getState();

    // fetch api using axios
    const { data } = await axios.post("/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });

    // remove cart info from local storage
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: errorMessage(error),
    });
  }
};

// action for getting order details
export const getOrderDetails = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    user: { userInfo },
  } = getState();

  try {
    const { data } = await axios.get(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: errorMessage(error),
    });
  }
};

// action for paying order
export const payOrder =
  (order, paymentResult) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
    const {
      user: { userInfo },
    } = getState();

    try {
      const { data } = axios.put(`/orders/pay/${order._id}`, paymentResult, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: errorMessage(error),
      });
    }
  };

// action for getting history orders of a user
export const getOrderHistory =
  ({ currPage = 1 }) =>
  async (dispatch, getState) => {
    dispatch({ type: ORDER_HISTORY_REQUEST });
    const {
      user: { userInfo },
    } = getState();

    try {
      const { data } = await axios.get(`/orders/history?currPage=${currPage}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      console.log(data);
      dispatch({ type: ORDER_HISTORY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_HISTORY_FAIL,
        payload: errorMessage(error),
      });
    }
  };

// action for getting all users' orders list
export const getOrderList =
  ({ currPage = 1 }) =>
  async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {
      user: { userInfo },
    } = getState();

    try {
      const { data } = await axios.get(`/orders/list?currPage=${currPage}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_LIST_FAIL,
        payload: errorMessage(error),
      });
    }
  };

// action for deleting order
export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
  const {
    user: { userInfo },
  } = getState();

  try {
    const { data } = await axios.delete(`/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DELETE_FAIL,
      payload: errorMessage(error),
    });
  }
};

// action for delivering order
export const deliverOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId });
  const {
    user: { userInfo },
  } = getState();

  try {
    const { data } = await axios.put(
      `/orders/deliver/${orderId}`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );

    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload: errorMessage(error),
    });
  }
};
