import React, { Fragment } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Search from "./Search";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/investorActions";
const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { investor, loading } = useSelector((state) => state.auth);
  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully.");
  };
  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img src="/images/rse.png" alt="RSE logo" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Route render={({ history }) => <Search history={history} />} />
        </div>
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/orders" className="btn" id="login_btn">
            All Orders
          </Link>

          {investor ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={investor.image && investor.image.url}
                    alt={investor && investor.username}
                    className="rounded-circle"
                  />
                </figure>
                <span>{investor && investor.username}</span>
              </Link>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {investor && investor.role === "admin" && (
                  <Link className="dropdown-item" to="/company/admin/register">
                    Register Company
                  </Link>
                )}
                <Link className="dropdown-item" to="/me/assets">
                  Assets
                </Link>
                <Link className="dropdown-item" to="/me/orders">
                  Orders
                </Link>
                <Link className="dropdown-item" to="/me">
                  Profile
                </Link>
                <Link className="dropdown-item" to="/report">
                  Report
                </Link>
                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn ml-4" id="login_btn">
                Login/SignUp
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
