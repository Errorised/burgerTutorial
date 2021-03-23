import React from "react";
import classes from "./ToggleMenuButton.module.css";

const toggleMenugButton = (props) => {
  return (
    <div className={classes.DrawerToggle} onClick={props.openSideDrawer}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default toggleMenugButton;
