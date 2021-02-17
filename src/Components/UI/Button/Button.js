import React from "react";
import classes from "./Button.module.css";

const button = (props) => {
    const {btnType, click} = props;
  return (
    <button onClick={click} className={`${classes.Button} ${classes[btnType]}`}>
      {props.children}
    </button>
  );
};

export default button;
