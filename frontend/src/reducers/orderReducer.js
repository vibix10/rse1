import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_REQUEST,
  COMPANY_ORDER_REQUEST,
  COMPANY_ORDER_SUCCESS,
  COMPANY_ORDER_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { ...state, loading: true };
    case CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case CREATE_ORDER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// GET COMPANY ORDERS
export const getOrdersReducer = (state = { company: {} }, action) => {
  switch (action.type) {
    case COMPANY_ORDER_REQUEST:
      return { ...state, loading: true, orders: [] };

    case COMPANY_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
        count: action.payload.count,
        rpp: action.payload.rpp,
        order1: action.payload.order1,
      };

    case COMPANY_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
