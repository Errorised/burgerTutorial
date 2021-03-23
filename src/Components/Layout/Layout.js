import React, { Component, Fragment } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../UI/Toolbar/Toolbar";
import SideDrawer from "../UI/Navigation/SideDrawer/SideDrawer";

// const layout = (props) => {
//   return (
//     <Fragment>
//       <Toolbar />
//       <SideDrawer />
//       <main className={classes.content}>{props.children}</main>
//     </Fragment>
//   );
// };

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  sideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true });
  };
  sideDrawerToggleHandler = () => {
    this.setState((prevValue) => {
      return { showSideDrawer: !prevValue.showSideDrawer };
    });
  };

  render() {
    return (
      <Fragment>
        <Toolbar open={this.sideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;
