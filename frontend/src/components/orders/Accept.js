import {
  acceptOrder,
  getOrderDetails,
  clearErrors,
} from "../../actions/orderActions";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useParams } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/loader";

const Accept = ({ history }) => {
  const params = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { investor } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.companyDetail);
  const { loading, orders, count, error } = useSelector(
    (state) => state.getOrders
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      history.push("/");
    }
    dispatch(getOrderDetails(params.orderid));
  }, [dispatch, alert, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    const order1 = { orderid: params.orderid };
    try {
      dispatch(acceptOrder(order1));
      history.push("/");
    } catch (error) {
      alert.error(error);
      dispatch(clearErrors());
      history.push("/");
    }
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Accept order"}></MetaData>
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">
                  {orders
                    ? orders.orderType === "selling"
                      ? `Accept buying shares of ${company.name}`
                      : `Accept ${orders.orderType} shares of ${company.name}`
                    : "invalid order! cancel to go to home page"}
                </h1>
                <div className="form-group">
                  <label htmlFor="username_field">Bid</label>
                  <input
                    type="Number"
                    id="username_field"
                    className="form-control"
                    value={orders.bid}
                    disabled
                    // onChange={(e) => {
                    //   setBid(e.target.value);
                    // }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username_field">Volume</label>
                  <input
                    type="Number"
                    id="username_field"
                    className="form-control"
                    value={orders.volume}
                    disabled
                    // onChange={(e) => {
                    //   setBid(e.target.value);
                    // }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username_field">Type</label>
                  <input
                    type="text"
                    id="username_field"
                    className="form-control"
                    value={orders.orderType}
                    disabled
                    // onChange={(e) => {
                    //   setBid(e.target.value);
                    // }}
                  />
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  CONFIRM
                </button>
                <Link
                  to={`/`}
                  id="view_btn1"
                  className="btn btn-danger btn-block"
                >
                  CANCEL
                </Link>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Accept;
