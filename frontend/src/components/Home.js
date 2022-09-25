import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getCompanies } from "../actions/companyActions";
import { Link, useParams } from "react-router-dom";
import Loader from "./layouts/loader";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";

const Home = ({ history }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const params = useParams();
  const keyword = params.keyword;
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, companies, count, error, rpp } = useSelector(
    (state) => state.companies
  );
  
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getCompanies(keyword, currentPage));
  }, [dispatch, alert, error, keyword, currentPage]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container container-fluid">
            <MetaData title="Home" />
            <h1 id="home_heading">Listed Companies</h1>

            <section id="products" className="container mt-5">
              <div className="row">
                {companies &&
                  companies.map((company) => (
                    <div
                      key={company._id}
                      className="col-sm-12 col-md-6 col-lg-3 my-3"
                    >
                      <div className="card p-3 rounded">
                        <img
                          className="card-img-top mx-auto"
                          src={company.logo}
                          alt="logo"
                        />
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">
                            <Link to={`/company/${company._id}`}>
                              {company.name}
                            </Link>
                          </h5>
                          <Link
                            to={`/company/${company._id}`}
                            id="view_btn1"
                            className="btn btn-primary btn-block"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>
          {rpp <= count && (
            <div className="d-flex justify-content-center">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={rpp}
                totalItemsCount={count}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </>
      )}
    </Fragment>
  );
};

export default Home;
