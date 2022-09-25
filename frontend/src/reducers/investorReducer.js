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
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_RESET,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  CLEAR_ERRORS,
} from "../constants/investorConstants";

export const authReducer = (state = { investor: {} }, action) => {
  switch (action.type) {
    case REGISTER_INVESTOR_REQUEST:
    case LOAD_LOGED_INVESTOR_REQUEST:
    case LOGIN_REQUEST:
      return {
        loading: true,
        isAutheticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_INVESTOR_SUCCESS:
    case LOAD_LOGED_INVESTOR_SUCCESS:
      return {
        ...state,
        loading: false,
        isAutheticated: true,
        investor: action.payload,
      };
    case INVESTOR_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAutheticated: false,
        investor: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAutheticated: false,

        investor: null,
        error: action.payload,
      };
    case REGISTER_INVESTOR_FAIL:
    case LOAD_LOGED_INVESTOR_FAIL:
      return {
        ...state,
        loading: false,
        isAutheticated: false,

        investor: null,
        error: action.payload,
      };
    case INVESTOR_LOGOUT_FAIL:
      return { ...state, error: action.payload };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,

        error: null,
      };
    default:
      return state;
  }
};

export const investorReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return { ...state, loading: false, isUpdated: action.payload };
    case UPDATE_PROFILE_RESET:
    case UPDATE_PASSWORD_RESET:
      return { ...state, isUpdated: false };
    case UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,

        error: null,
      };
    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case NEW_PASSWORD_REQUEST:
      return { ...state, loading: true, error: null };
    case NEW_PASSWORD_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, loading: false, message: action.payload };
    case FORGOT_PASSWORD_FAIL:
    case NEW_PASSWORD_FAIL:
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
