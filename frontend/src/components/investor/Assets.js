import React, { Fragment } from "react";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/loader";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import Shares from "./Shares";
import { getCompanies } from "../../actions/companyActions";
import { investorReducer } from "../../reducers/investorReducer";
import axios from "axios";

const Assets = () => {
  const { investor, loading } = useSelector((state) => state.auth);
  const shares = investor.shares;
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"profile"} />

          <div className="row justify-content-around mt-5 user-info">
            <div className="col-8 col-md-5">
              <h2 className="mt-5 ml-5">Assets</h2>
              <h4>Balance</h4>
              <p>{investor.cashBalance}</p>
              {investor &&
                shares.map((a) => (
                  <div key={a.companyRef}>
                    <h4>{a.companyName}</h4>
                    <p>Number of securities: {a.num}</p>
                  </div>
                ))}

              <Link to="/orders" className="btn btn-danger btn-block mt-5">
                Orders
              </Link>

              <Link to="/me/topup" className="btn btn-primary btn-block mt-3">
                Deposit
              </Link>
              <Link
                to="/me/withdraw"
                className="btn btn-primary btn-block mt-3"
              >
                Withdraw
              </Link>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Assets;
