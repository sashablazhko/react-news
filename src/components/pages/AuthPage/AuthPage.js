import React from "react";
import classes from "./AuthPage.module.css";
import { connect } from "react-redux";

import { signInGoogle, moduleName } from "../../../ducks/auth";
import SignIn from "../../auth/SignIn/SignIn";
import bg from "../../../resources/images/bg.jpg";

const AuthPage = props => {
  const signInGoogle = () => {
    props.signInGoogle();
  };

  return (
    <div className={classes.AuthPage} style={{ background: `url(${bg})` }}>
      <div className="container container__padding container__small">
        <div className="centerblock background">
          <SignIn signInGoogle={signInGoogle} loading={props.loading} />
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({ loading: state[moduleName].loading }),
  { signInGoogle }
)(AuthPage);
