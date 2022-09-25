import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getCompanyDetails, clearErrors } from "../../actions/companyActions";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/loader";
import { useParams, Link } from "react-router-dom";

const CompanyDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, company } = useSelector(
    (state) => state.companyDetail
  );

  useEffect(() => {
    dispatch(getCompanyDetails(params.id));
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
  }, [dispatch, alert, error, params.id]);

  return (
    <Fragment>
      <MetaData title={company.name} />
      {loading ? (
        <Loader />
      ) : (
        <div className="row justify-content-around mt-5 user-info">
          <div className="col-8 col-md-5">
            <h2 className="mt-5 ml-5">{company.name}</h2>
            <h4>Trade Symbol</h4>
            <p>{company.companyID}</p>
            <h4>Phone Number</h4>
            <p>{company.phone}</p>
            <h4>Email</h4>
            <p>{company.email}</p>
            <h4>City</h4>
            <p>{company.city}</p>
            <h4>Country</h4>
            <p>{company.country}</p>
            <h4>Security</h4>
            <p>{company.securityType}</p>
            <h4>IPO shares offered</h4>
            <p>{company.totalShares}</p>
            <h4>Number of outstanding IPO securities</h4>
            <p>{company.outstanding}</p>
            <h4>IPO share price</h4>
            <p>{company.ipo}</p>
            <h4>Description</h4>
            <p>{company.description}</p>

            <Link to="/iporder" className="btn btn-primary btn-block mt-5">
              IPO Order
            </Link>

            <Link to="/buying" className="btn btn-primary btn-block mt-3">
              Buying Order
            </Link>
            <Link to="/selling" className="btn btn-primary btn-block mt-3">
              Selling Order
            </Link>
            <Link
              to={`/outstanding/${company._id}`}
              className="btn btn-primary btn-block mt-3"
            >
              Outstanding Orders
            </Link>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CompanyDetails;
