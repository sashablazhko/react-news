import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Drawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

export class Drawer extends Component {
  selectMenuItem = () => {
    this.props.onClose();
  };

  renderLinks(links) {
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
    const { isOpen, authorized, onClose } = this.props;

    const cls = [classes.Drawer, isOpen ? "" : classes.close];

    const links = [{ to: "/", label: "На главную", exact: true }];

    if (authorized) {
      links.push({ to: "/news/new", label: "Создать новость", exact: false });
    } else {
      links.push({ to: "/login", label: "Вход", exact: false });
    }
    links.push({ to: "/news/my", label: "Мой кабинет", exact: false });

    return (
      <React.Fragment>
        <nav className={cls.join(" ")}>
          <ul>{this.renderLinks(links)}</ul>
        </nav>
        {isOpen ? <Backdrop onClick={onClose} /> : null}
      </React.Fragment>
    );
  }
}

export default Drawer;
