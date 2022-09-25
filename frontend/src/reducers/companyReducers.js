import {
  ALL_COMPANY_REQUEST,
  ALL_COMPANY_SUCCESS,
  ALL_COMPANY_FAIL,
  COMPANY_DETAIL_REQUEST,
  COMPANY_DETAIL_SUCCESS,
  COMPANY_DETAIL_FAIL,
  REGISTER_COMPANY_REQUEST,
  REGISTER_COMPANY_SUCCESS,
  REGISTER_COMPANY_FAIL,
  CLEAR_ERRORS,
} from "../constants/companyConstants";

export const companyReducer = (state = { companies: [] }, action) => {
  switch (action.type) {
    case ALL_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
        companies: [],
      };
    case ALL_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        companies: action.payload.companies,
        count: action.payload.count,
        rpp: action.payload.rpp,
        
      };
    case ALL_COMPANY_FAIL:
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

export const companyDetailReducer = (state = { company: {} }, action) => {
  switch (action.type) {
    case COMPANY_DETAIL_REQUEST:
    case REGISTER_COMPANY_REQUEST:
      return { ...state, loading: true };
    case COMPANY_DETAIL_SUCCESS:
    case REGISTER_COMPANY_SUCCESS:
      return { ...state, loading: false, company: action.payload };
    case COMPANY_DETAIL_FAIL:
    case REGISTER_COMPANY_FAIL:
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
