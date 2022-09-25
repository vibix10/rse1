import { registerCompany, clearErrors } from "../../actions/companyActions";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/loader";

const RegisterCompany = ({ history }) => {
  const [companyData, setCompanyData] = useState({
    companyID: "",
    name: "",
    logo: "",
    phone: "",
    email: "",
    city: "",
    country: "",
    securityType: "",
    totalShares: "",
    ipo: "",
    description: "",
  });

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, company } = useSelector(
    (state) => state.companyDetail
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("companyID", companyData.companyID);
    formData.set("name", companyData.name);
    formData.set("logo", companyData.logo);
    formData.set("phone", companyData.phone);
    formData.set("email", companyData.email);
    formData.set("city", companyData.city);
    formData.set("country", companyData.country);
    formData.set("securityType", companyData.securityType);
    formData.set("totalShares", companyData.totalShares);
    formData.set("ipo", companyData.ipo);
    formData.set("description", companyData.description);

    dispatch(registerCompany(formData));
    history.push("/");
  };

  return (
    <Fragment>
      <MetaData title={"Register Company"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mb-3">Company Registration</h1>

            <div className="form-group">
              <label htmlFor="name_field">companyID</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="companyID"
                value={companyData.companyID}
                onChange={(e) =>
                  setCompanyData({ ...companyData, companyID: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={companyData.name}
                onChange={(e) =>
                  setCompanyData({ ...companyData, name: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="name_field">logo</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="logo"
                value={companyData.logo}
                onChange={(e) =>
                  setCompanyData({ ...companyData, logo: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="name_field">phone</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="phone"
                value={companyData.phone}
                onChange={(e) =>
                  setCompanyData({ ...companyData, phone: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="name_field">email</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="email"
                value={companyData.email}
                onChange={(e) =>
                  setCompanyData({ ...companyData, email: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="name_field">city</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="city"
                value={companyData.city}
                onChange={(e) =>
                  setCompanyData({ ...companyData, city: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="name_field">country</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="country"
                value={companyData.country}
                onChange={(e) =>
                  setCompanyData({ ...companyData, country: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="name_field">securities (bond/share)</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="securityType"
                value={companyData.securityType}
                onChange={(e) =>
                  setCompanyData({
                    ...companyData,
                    securityType: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="name_field">Total Shares Offered</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="totalShares"
                value={companyData.totalShares}
                onChange={(e) =>
                  setCompanyData({
                    ...companyData,
                    totalShares: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="name_field">IPO</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="ipo"
                value={companyData.ipo}
                onChange={(e) =>
                  setCompanyData({ ...companyData, ipo: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="name_field">description</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="description"
                value={companyData.description}
                onChange={(e) =>
                  setCompanyData({
                    ...companyData,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default RegisterCompany;
