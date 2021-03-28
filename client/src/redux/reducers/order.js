import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_HISTORY_REQUEST,
  ORDER_HISTORY_SUCCESS,
  ORDER_HISTORY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_RESET,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} from "../actionTypes";

// reducer for creating an order
export const orderCreate = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

// reducer for getting order details
export const orderDetails = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// reducer for paying an order
export const orderPay = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

// reducer for getting history orders of a user
export const orderHistory = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_HISTORY_REQUEST:
      return { loading: true };
    case ORDER_HISTORY_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        page: action.payload.page,
        pages: action.payload.pages,
        count: action.payload.count,
      };
    case ORDER_HISTORY_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// reducer for getting all users' orders list
export const orderList = (state = { orderList: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orderList: action.payload.orderList,
        page: action.payload.page,
        pages: action.payload.pages,
        count: action.payload.count,
      };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// reducer for deleting an order
export const orderDelete = (state = { loading: false }, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true };
    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

// reducer for delivering order
export const orderDeliver = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return { loading: true };
    case ORDER_DELIVER_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELIVER_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELIVER_RESET:
      return {};

    default:
      return state;
  }
};
// export default order;
