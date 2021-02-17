import React, { Fragment } from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";

const modal = (props) => {
  return (
    <Fragment>
      <Backdrop show={props.show} disable={props.disable}/>
      <div
        className={classes.Modal}
        style={{
          opacity: props.show ? "1" : "0",
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        }}
      >
        {props.children}
      </div>
    </Fragment>
  );
};

export default modal;
