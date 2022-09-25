import React from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";

const Shares = (props) => {
  //const { investor, loading } = useSelector((state) => state.auth);
  return (
    <Fragment>
      {props.forEach((e) => (
        <div key={e.company}>
          <h4>{e.company}</h4>
          <p>{e.num}</p>
        </div>
      ))}
    </Fragment>
  );
};

export default Shares;
