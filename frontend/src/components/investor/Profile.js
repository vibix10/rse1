import React, { Fragment } from "react";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/loader";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { investor, loading } = useSelector((state) => state.auth);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"profile"} />
          <h2 className="mt-5 ml-5">Profile</h2>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
              <figure className="avatar avatar-profile">
                <img
                  className="rounded-circle img-fluid"
                  src={investor.image.url}
                  alt={investor.username}
                />
              </figure>
              <Link
                to="/me/update"
                id="edit_profile"
                className="btn btn-primary btn-block my-5"
              >
                Edit Profile
              </Link>
            </div>

            <div className="col-12 col-md-5">
              <h4>Full Name</h4>
              <p>{investor.username}</p>

              <h4>Email Address</h4>
              <p>{investor.email}</p>

              <h4>Phone Number</h4>
              <p>{investor.phone}</p>

              <h4>Balance</h4>
              <p>{investor.cashBalance}</p>

              {investor.shares.map((e) => {
                <div>
                  <h4>{e.company}</h4>
                  <p>{e.num}</p>
                </div>;
              })}

              <p>home</p>
              <Link to="/orders" className="btn btn-danger btn-block mt-5">
                Orders
              </Link>

              <Link
                to="/password/update"
                className="btn btn-primary btn-block mt-3"
              >
                Change Password
              </Link>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
