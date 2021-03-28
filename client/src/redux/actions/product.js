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
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_CATEGORY_REQUEST,
  PRODUCT_CATEGORY_SUCCESS,
  PRODUCT_CATEGORY_FAIL,
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_REQUEST,
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
} from "../actionTypes";

// action for getting all products
export const fetchProducts = ({
  currPage = 1,
  name = "",
  category = "",
  sort = "",
}) => async (dispatch) => {
  dispatch({ type: PRODUCTS_REQUEST });

  try {
    // fetch api with search filters
    const { data } = await axios.get(
      `/products?name=${name}&category=${category}&sort=${sort}&currPage=${currPage}`
    );
    dispatch({ type: PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCTS_FAIL, payload: error.message });
  }
};

// action for getting all product list for admin
export const fetchProductList = ({
  currPage = 1,
  name = "",
  category = "",
  sort = "",
}) => async (dispatch) => {
  dispatch({ type: PRODUCTS_LIST_REQUEST });

  try {
    // fetch api with search filters
    const { data } = await axios.get(
      `/products/list?name=${name}&category=${category}&sort=${sort}&currPage=${currPage}`
    );
    dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCTS_LIST_FAIL, payload: error.message });
  }
};

// action for getting categories list
export const getProductCategories = () => async (dispatch) => {
  dispatch({ type: PRODUCT_CATEGORY_REQUEST });

  try {
    const { data } = await axios.get(`/products/categories`);
    dispatch({ type: PRODUCT_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_CATEGORY_FAIL, payload: error.message });
  }
};

// action for getting product detail
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

// action for creating product
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

// action for editting product
export const editProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
  const {
    user: { userInfo },
  } = getState();

  try {
    const { data } = await axios.put(`/products/${product._id}`, product, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// action for deleting product
export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
  const {
    user: { userInfo },
  } = getState();

  try {
    const result = await axios.delete(`/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: result });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// action for creating review of a product
export const createReview = (productId, review) => async (
  dispatch,
  getState
) => {
  dispatch({ type: REVIEW_CREATE_REQUEST });

  const {
    user: { userInfo },
  } = getState();

  try {
    const { data } = await axios.post(
      `/products/reviews/${productId}`,
      review,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: REVIEW_CREATE_SUCCESS, payload: data.review });
  } catch (error) {
    dispatch({
      type: REVIEW_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
