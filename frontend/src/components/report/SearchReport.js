import React, { useState } from "react";
//import { useRouteMatch, useNavigate } from "react-router-dom";
//import { useHistory } from "react-router";
const SearchReport = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  //const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      //navigate(`/search/${keyword}`);
      history.push(`/report/${keyword}`);
    } else {
      //navigate(`/`);
      history.push("/report");
    }
  };
  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter date ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchReport;
