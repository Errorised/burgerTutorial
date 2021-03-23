import React, { Fragment } from "react";
import Logo from "../../../../Components/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../Backdrop/Backdrop";

const sideDrawer = (props) => {
  return (
    <Fragment>
      <Backdrop show= {props.open} disable={props.closed} />
      <div className={[classes.SideDrawer, props.open?classes.Open:classes.Close].join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  );
};

export default sideDrawer;
