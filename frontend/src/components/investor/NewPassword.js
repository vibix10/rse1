import {
  resetPassword,
  loadInvester,
  clearErrors,
} from "../../actions/investorActions";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
//import { Link, useNavigate, useParams } from "react-router-dom";
import MetaData from "../layouts/MetaData";

const NewPassword = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  const { investor } = useSelector((state) => state.auth);
  const { error, loading, success } = useSelector(
    (state) => state.forgotPassword
  );
  //const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      //navigate("/");
    }
    if (success) {
      alert.success("password updated successfully");
      history.push("/login");
    }
  }, [dispatch, alert, error, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, formData));
  };
  return (
    <Fragment>
      <MetaData title={"new password"} />
      <div class="row wrapper">
        <div class="col-10 col-lg-5">
          <form class="shadow-lg" onSubmit={submitHandler}>
            <h1 class="mb-3">New Password</h1>

            <div class="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                class="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div class="form-group">
              <label htmlFor="confirm_password_field">Confirm Password</label>
              <input
                type="password"
                id="confirm_password_field"
                class="form-control"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              id="new_password_button"
              type="submit"
              class="btn btn-block py-3"
            >
              Set Password
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewPassword;
