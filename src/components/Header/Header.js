import React, { Component } from "react";
import { Link } from "react-router-dom";

import classes from "./Header.module.css";
import AuthMenu from "../Navigation/AuthMenu/AuthMenu";

export class Header extends Component {
  cls = [classes.Header, "grid-item"];
  render() {
    return (
      <header className={this.cls.join(" ")}>
        <div className={classes.logo}>
          <Link to="/">Главная</Link>
        </div>

        <div className={classes.options}>
          <AuthMenu />
        </div>
      </header>
    );
  }
}

export default Header;
