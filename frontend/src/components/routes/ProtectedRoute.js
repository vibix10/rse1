import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAutheticated, loading, investor } = useSelector(
    (state) => state.auth
  );
  
  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAutheticated === false) {
              return <Redirect to="/login" />;
            }

            //if (isAdmin === true && investor.role !== "admin") {
              //return <Redirect to="/" />;
            //}

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
