import axios from "axios";
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_DETAIL_REQUEST,
  USER_DETAIL_FAIL,
  USER_DETAIL_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_DELETE_REQUEST,
  USER_DELETE_FAIL,
  USER_DELETE_SUCCESS,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_EDIT_FAIL,
} from "../actionTypes";
import { errorMessage } from "../helpers/actionError";

// action for user sign in
export const signIn = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });

  try {
    const { data } = await axios.post("/users/signin", { email, password });

    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: errorMessage(error),
    });
  }
};

// action for user sign up
export const signUp = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST, payload: { name, email, password } });

  try {
    const { data } = await axios.post("/users/signup", {
      name,
      email,
      password,
    });

    dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: errorMessage(error),
    });
  }
};

// action for user sign out
export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");

  dispatch({ type: USER_SIGNOUT });
};

// action for getting user details
export const getUserDetail = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAIL_REQUEST, payload: userId });
  const {
    user: { userInfo },
  } = getState();

  try {
    const { data } = await axios.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: USER_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAIL_FAIL,
      payload: errorMessage(error),
    });
  }
};

// action for updating user profile
export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_REQUEST, payload: user });
  const {
    user: { userInfo },
  } = getState();

  try {
    const { data } = await axios.put("/users/profile", user, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: errorMessage(error),
    });
  }
};

// action for getting all users list
export const getUserList = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });
  const {
    user: { userInfo },
  } = getState();

  try {
    const { data } = await axios.get("/users", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: errorMessage(error),
    });
  }
};

// action for deleting a specific user
export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DELETE_REQUEST, payload: userId });
  const {
    user: { userInfo },
  } = getState();

  try {
    const { data } = await axios.delete(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: errorMessage(error),
    });
  }
};

// action for editting user info
export const editUser = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_EDIT_REQUEST, payload: user });
  const {
    user: { userInfo },
  } = getState();

  try {
    const { data } = await axios.put(`/users/${user._id}`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: USER_EDIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_EDIT_FAIL,
      payload: errorMessage(error),
    });
  }
};
