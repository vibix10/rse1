import {
  updateProfile,
  loadInvester,
  clearErrors,
} from "../../actions/investorActions";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
//import { Link, useNavigate, useParams } from "react-router-dom";
import MetaData from "../layouts/MetaData";
//import Loader from "../layouts/loader";
import { UPDATE_PROFILE_RESET } from "../../constants/investorConstants";

const UpdateProfile = ({ history }) => {
  const [investorData, setInvestorData] = useState({
    name: "",
    username: "",
    email: "",
    //password: "",
    phone: "",
    role: "",
  });
  const { name, username, email, phone, role } = investorData;
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("/images/default.jpg");
  const alert = useAlert();
  const dispatch = useDispatch();
  const { investor } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.investor);
  //const navigate = useNavigate();
  useEffect(() => {
    if (investor) {
      setInvestorData({
        name: investor.name,
        username: investor.username,
        email: investor.email,
        //password: "",
        phone: investor.phone,
        role: investor.role,
      });
      setImagePreview(investor.image.url);
      //history.push("/");
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      //navigate("/");
    }
    if (isUpdated) {
      alert.success("successfully updated");
      dispatch(loadInvester());
      history.push("/");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, alert, error, history, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("username", username);
    formData.set("email", email);
    //formData.set("password", password);
    formData.set("phone", phone);
    formData.set("role", role);
    formData.set("image", image);

    dispatch(updateProfile(formData));
  };
  const onChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result);
          setImage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setInvestorData({ ...investorData, [e.target.name]: e.target.value });
    }
  };
  return (
    <Fragment>
      <MetaData title={"Update Investor"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mb-3">Investor Update Profile</h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="username_field">Username</label>
              <input
                type="name"
                id="username_field"
                className="form-control"
                name="username"
                value={username}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>

            {/* <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div> */}

            <div className="form-group">
              <label htmlFor="phone_field">Phone</label>
              <input
                type="text"
                id="phone_field"
                className="form-control"
                name="phone"
                value={phone}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="role_field">Role (investor/underwriter)</label>
              <input
                type="text"
                id="role_field"
                className="form-control"
                name="role"
                value={role}
                onChange={onChange}
              />
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              UPDATE
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
