import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyOrders } from "../../actions/orderActions";
import { Link, useParams } from "react-router-dom";
import Loader from "../layouts/loader";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";

const CompanyOrders = ({ history }) => {
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const params = useParams();
  //   const keyword = params.keyword;
  const alert = useAlert();
  const dispatch = useDispatch();
  const { company } = useSelector((state) => state.companyDetail);
  const { loading, orders, count, error } = useSelector(
    (state) => state.getOrders
  );
  useEffect(() => {
    if (error) {
      return alert.error(error);
      //history.push("/");
    }
    dispatch(getCompanyOrders(company._id));
  }, [dispatch, alert, error]);

  //   function setCurrentPageNo(pageNumber) {
  //     setCurrentPage(pageNumber);
  //   }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container container-fluid">
            <MetaData title="Orders" />
            <h1 id="home_heading">Outstanding {company.companyID} Orders</h1>

            <section id="products" className="container mt-5">
              <div className="row">
                {orders &&
                  orders.map((order) => (
                    <div
                      key={order._id}
                      className="col-sm-12 col-md-6 col-lg-3 my-3"
                    >
                      <div className="card p-3 rounded">
                        <img
                          className="card-img-top mx-auto"
                          src={order.company.logo}
                          alt="logo"
                        />
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">
                            Type: {order.orderType}
                          </h5>
                          <h5 className="card-title">Bid: {order.bid}</h5>
                          <h5 className="card-title">Volume: {order.volume}</h5>
                          <h5 className="card-title">
                            Total Cost: {order.totalCost}
                          </h5>
                          <Link
                            to={`/accept/${order._id}`}
                            id="view_btn1"
                            className="btn btn-primary btn-block"
                          >
                            Accept
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>
          {/* {rpp <= count && (
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
          )} */}
        </>
      )}
    </Fragment>
  );
};

export default CompanyOrders;
