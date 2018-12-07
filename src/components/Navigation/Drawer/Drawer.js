import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Drawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const links = [
  { to: "/", label: "На главную", exact: true },
  { to: "/news/new", label: "Создать новость", exact: false },
  { to: "/news/my", label: "Мои новости", exact: false },
];

export class Drawer extends Component {
  selectMenuItem = () => {
    this.props.onClose();
  };

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink to={link.to} exact={link.exact} activeClassName={classes.active} onClick={this.selectMenuItem}>
            {link.label}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    const cls = [classes.Drawer, this.props.isOpen ? "" : classes.close];

    return (
      <React.Fragment>
        <nav className={cls.join(" ")}>
          <ul>{this.renderLinks()}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    );
  }
}

export default Drawer;
