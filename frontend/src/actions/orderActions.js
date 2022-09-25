import axios from "axios";
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_REQUEST,
  COMPANY_ORDER_REQUEST,
  COMPANY_ORDER_SUCCESS,
  COMPANY_ORDER_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

// selling
export const createSellingOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/order/selling/create/${order.companyid}`,
      order,
      config
    );

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// buying
export const createBuyingOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/order/buying/create/${order.companyid}`,
      order,
      config
    );

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// IPO
export const createIpoOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/order/ipo/create/${order.companyid}`,
      order,
      config
    );

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get order details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COMPANY_ORDER_REQUEST });
    const { data } = await axios.get(`/api/order/${id}`);
    dispatch({ type: COMPANY_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COMPANY_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// accept order
export const acceptOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/order/accept/${order.orderid}`,
      order,
      config
    );

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get orders
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: COMPANY_ORDER_REQUEST });
    const { data } = await axios.get(`/api/order`);
    dispatch({ type: COMPANY_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COMPANY_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get orders report
const year = new Date().getFullYear();
const month = Number(new Date().getMonth()) + 1;
const day = new Date().getDate();
export const getAllOrdersReport =
  (keyword = `${year}-0${month}-${day}`, currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: COMPANY_ORDER_REQUEST });
      const { data } = await axios.get(
        `/api/order/report?keyword=${keyword}&nam=${currentPage}`
      );
      dispatch({ type: COMPANY_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: COMPANY_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
    console.log(`${year}-${month}-${day}`);
  };

// get company orders
export const getCompanyOrders = (companyid) => async (dispatch) => {
  try {
    dispatch({ type: COMPANY_ORDER_REQUEST });
    const { data } = await axios.get(`/api/order/outstanding/${companyid}`);
    dispatch({ type: COMPANY_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COMPANY_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get investor orders
export const getInvestorOrders = () => async (dispatch) => {
  try {
    dispatch({ type: COMPANY_ORDER_REQUEST });
    const { data } = await axios.get(`/api/order/me`);
    dispatch({ type: COMPANY_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COMPANY_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
