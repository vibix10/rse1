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
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const TopUp = ({ history }) => {
  const [amount, setAmount] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();
  const { investor } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.investor);
  //const navigate = useNavigate();
  useEffect(() => {
    // if (investor) {
    //   setAmount(investor.cashBalance);
    // }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      //navigate("/");
    }
    if (isUpdated) {
      alert.success("Deposit made successfully");
      dispatch(loadInvester());
      history.push("/me/assets");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, alert, error, history, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.set("amount", Number(amount) + Number(investor.cashBalance));

    dispatch(updateProfile(formData));
  };

  return (
    <Fragment>
      <MetaData title={"Update Investor"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Amount</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">amount</label>
              <input
                type="number"
                id="card_num_field"
                className="form-control"
                options={options}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Deposit
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default TopUp;
