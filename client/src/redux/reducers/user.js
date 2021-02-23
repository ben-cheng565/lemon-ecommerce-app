import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_RESET,
  USER_DELETE_SUCCESS,
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_RESET,
  USER_DETAIL_SUCCESS,
  USER_EDIT_FAIL,
  USER_EDIT_REQUEST,
  USER_EDIT_RESET,
  USER_EDIT_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from "../actionTypes";

const user = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload };

    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const userDetails = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_DETAIL_REQUEST:
      return { loading: true };
    case USER_DETAIL_SUCCESS:
      return { loading: false, userDetail: action.payload };
    case USER_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAIL_RESET:
      return {};
    default:
      return state;
  }
};

export const updateProfile = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userList = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDelete = (state = { loading: false }, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const userEdit = (state = {}, action) => {
  switch (action.type) {
    case USER_EDIT_REQUEST:
      return { loading: true };
    case USER_EDIT_SUCCESS:
      return { loading: false, success: true };
    case USER_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case USER_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

export default user;
