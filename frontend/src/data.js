import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  companyReducer,
  companyDetailReducer,
} from "./reducers/companyReducers";

import {
  authReducer,
  investorReducer,
  forgotPasswordReducer,
} from "./reducers/investorReducer";

import { orderReducer, getOrdersReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
  companies: companyReducer,
  companyDetail: companyDetailReducer,
  auth: authReducer,
  investor: investorReducer,
  forgotPassword: forgotPasswordReducer,
  order: orderReducer,
  getOrders: getOrdersReducer,
});
let initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
