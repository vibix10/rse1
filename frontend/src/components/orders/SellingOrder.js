import { createSellingOrder, clearErrors } from "../../actions/orderActions";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/loader";

const SellingOrder = ({ history }) => {
  const [bid, setBid] = useState("");
  const [volume, setVolume] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();
  const { investor } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.companyDetail);
  const { loading, error, order } = useSelector((state) => state.order);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      history.push("/");
    }
  }, [dispatch, alert, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    const order1 = { bid, volume, companyid: company._id };
    try {
      dispatch(createSellingOrder(order1));
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
          <MetaData title={"Selling order"}></MetaData>
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">{`sell ${company.name} shares`}</h1>
                <div className="form-group">
                  <label htmlFor="username_field">Bid</label>
                  <input
                    type="Number"
                    id="username_field"
                    className="form-control"
                    value={bid}
                    onChange={(e) => {
                      setBid(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Volume</label>
                  <input
                    type="Number"
                    id="password_field"
                    className="form-control"
                    value={volume}
                    onChange={(e) => {
                      setVolume(e.target.value);
                    }}
                  />
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  PLACE ORDER
                </button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default SellingOrder;
