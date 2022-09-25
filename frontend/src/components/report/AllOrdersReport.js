import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getAllOrdersReport } from "../../actions/orderActions";
import { Link, useParams, Route } from "react-router-dom";
import Loader from "../layouts/loader";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import SearchReport from "./SearchReport";
import { utils, writeFile } from "xlsx";
const AllOrdersReport = ({ history }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const params = useParams();
  const keyword = params.keyword;
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, orders, count, error, rpp, order1 } = useSelector(
    (state) => state.getOrders
  );
  useEffect(() => {
    if (error) {
      return alert.error(error);
      //history.push("/");
    }
    dispatch(getAllOrdersReport(keyword, currentPage));
  }, [dispatch, alert, error, keyword, currentPage]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  function handleExcel() {
    var wb = utils.book_new();
    var ws = utils.json_to_sheet(order1);
    utils.book_append_sheet(wb, ws, "Report");
    writeFile(wb, "RSE.xlsx");
  }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container container-fluid">
            <MetaData title="Orders" />
            <h1 id="home_heading">Report</h1>
            <div className="col-12 col-md-6 mt-2 mt-md-0">
              <Route
                render={({ history }) => <SearchReport history={history} />}
              />
            </div>
            <h5 className="user-info ml-5">yyyy-mm-dd eg 2022-09-24</h5>
            <button
              id="login_button"
              type="submit"
              className="btn btn-primary btn-block py-3"
              onClick={handleExcel}
            >
              Download Excel
            </button>
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
                          <h5 className="card-title">Status: {order.status}</h5>
                          {/* <Link
                            to={`/company/${company._id}`}
                            id="view_btn1"
                            className="btn btn-primary btn-block"
                          >
                            View Details
                          </Link> */}
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

export default AllOrdersReport;
