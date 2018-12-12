import React, { Component } from "react";
import classes from "./AuthMenu.module.css";
import { connect } from "react-redux";
import { moduleName } from "../../../ducks/auth";
import AuthSubmenu from "./AuthSubmenu/AuthSubmenu";

export class AuthMenu extends Component {
  render() {
    const { authorized, name, email } = this.props;
    return (
      <div className={classes.AuthMenu}>
        {!!authorized && <i className="fas fa-user" />}
        {!authorized && <i className="fas fa-sign-in-alt" />}
        <div className={classes.submenu_wrapper}>
          {!!authorized && (
            <div className={classes.name}>
              <p>{name}</p>
            </div>
          )}

          <ul className={classes.submenu}>
            <AuthSubmenu authorized={authorized} email={email} />
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      authorized: state[moduleName].user.expirationDate && new Date() < state[moduleName].user.expirationDate,
      name: state[moduleName].user.name,
      email: state[moduleName].user.email,
    };
  },
  null,
  null,
  { pure: false }
)(AuthMenu);
