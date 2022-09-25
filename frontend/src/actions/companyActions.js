import axios from "axios";
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
import { REGISTER_INVESTOR_FAIL } from "../constants/investorConstants";

export const getCompanies =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_COMPANY_REQUEST });
      const { data } = await axios.get(
        `/api/company/companies?keyword=${keyword}&nam=${currentPage}`
      );
      dispatch({ type: ALL_COMPANY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_COMPANY_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  
// get company details
export const getCompanyDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COMPANY_DETAIL_REQUEST });
    const { data } = await axios.get(`/api/company/${id}`);
    dispatch({ type: COMPANY_DETAIL_SUCCESS, payload: data.company });
  } catch (error) {
    dispatch({
      type: COMPANY_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// register company
export const registerCompany = (companyData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_COMPANY_REQUEST });
    const config = { headers: { "content-type": "multipart/form-data" } };
    const { data } = await axios.post(
      "/api/company/registration",
      companyData,
      config
    );
    dispatch({ type: REGISTER_COMPANY_SUCCESS, payload: data.company });
  } catch (error) {
    dispatch({
      type: REGISTER_INVESTOR_FAIL,
      payload: error.response.data.message,
    });
  }
  
  
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
