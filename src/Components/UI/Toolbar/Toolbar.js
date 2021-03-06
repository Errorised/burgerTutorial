import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../../UI/Navigation/NavigationItems/NavigationItems";
import ToggleMenugButton from "../Navigation/SideDrawer/ToggleMenuButton/ToggleMenuButton";

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <ToggleMenugButton openSideDrawer={props.open} />
      <div className={[classes.Logo, classes.DesktopOnly].join(" ")}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;
