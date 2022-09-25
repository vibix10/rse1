import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_INVESTOR_REQUEST,
  REGISTER_INVESTOR_SUCCESS,
  REGISTER_INVESTOR_FAIL,
  LOAD_LOGED_INVESTOR_REQUEST,
  LOAD_LOGED_INVESTOR_SUCCESS,
  LOAD_LOGED_INVESTOR_FAIL,
  INVESTOR_LOGOUT_SUCCESS,
  INVESTOR_LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_RESET,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  CLEAR_ERRORS,
} from "../constants/investorConstants";

// Login
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "content-type": "application/json" } };
    const { data } = await axios.post(
      "/api/investor/login",
      { username, password },
      config
    );
    dispatch({ type: LOGIN_SUCCESS, payload: data.investor });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// register investor
export const registerInvestor = (investorData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_INVESTOR_REQUEST });
    const config = { headers: { "content-type": "multipart/form-data" } };
    const { data } = await axios.post(
      "/api/investor/register",
      investorData,
      config
    );
    dispatch({ type: REGISTER_INVESTOR_SUCCESS, payload: data.investor });
  } catch (error) {
    dispatch({
      type: REGISTER_INVESTOR_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update profile
export const updateProfile = (investorData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const config = { headers: { "content-type": "multipart/form-data" } };
    const { data } = await axios.put(
      "/api/investor/me/update",
      investorData,
      config
    );
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    const config = { headers: { "content-type": "application/json" } };
    const { data } = await axios.put(
      "/api/investor/password/update",
      passwords,
      config
    );
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const config = { headers: { "content-type": "application/json" } };
    const { data } = await axios.post(
      "/api/investor/password/forgot",
      email,
      config
    );
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PASSWORD_REQUEST });
    const config = { headers: { "content-type": "application/json" } };
    const { data } = await axios.put(
      `/api/investor/password/reset/${token}`,
      passwords,
      config
    );
    dispatch({ type: NEW_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: NEW_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get logedin investor
export const loadInvester = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_LOGED_INVESTOR_REQUEST });

    const { data } = await axios.post("/api/investor/me");

    dispatch({ type: LOAD_LOGED_INVESTOR_SUCCESS, payload: data.investor });
  } catch (error) {
    dispatch({
      type: LOAD_LOGED_INVESTOR_FAIL,
      payload: error.response.data.message,
    });
  }
};

// logout investor
export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/investor/logout");

    dispatch({ type: INVESTOR_LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: INVESTOR_LOGOUT_FAIL,
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
