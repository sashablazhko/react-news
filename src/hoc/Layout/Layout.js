import React, { Component } from "react";
import classes from "./Layout.module.css";
import { connect } from "react-redux";

import { moduleName } from "../../ducks/auth";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

export class Layout extends Component {
  state = {
    menu: false,
  };

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu,
    });
  };

  menuCloseHandler = () => {
    this.setState({
      menu: false,
    });
  };

  render() {
    return (
      <div className={classes.Layout}>
        <Drawer isOpen={this.state.menu} onClose={this.menuCloseHandler} authorized={this.props.authorized} />
        <MenuToggle onToggle={this.toggleMenuHandler} isOpen={this.state.menu} />
        <Header />
        <main>{this.props.children}</main>
        <Footer />
      </div>
    );
  }
}

export default connect(state => {
  return {
    authorized: state[moduleName].user.expirationDate && new Date() < state[moduleName].user.expirationDate,
  };
})(Layout);
