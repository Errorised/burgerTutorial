import React from "react";
import classes from "./Logo.module.css";
import Logo from "../../Assets/images/burger-logo.png";

const logo = () => {
  return (
    <div className={classes.Logo} >
      <img src={Logo} />
    </div>
  );
};

export default logo;