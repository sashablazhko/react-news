import React from "react";
import classes from "./AuthPage.module.css";
import { connect } from "react-redux";

import { signUp, signIn, moduleName } from "../../../ducks/auth";
import SignIn from "../../auth/SignIn/SignIn";
import SignUp from "../../auth/SignUp/SignUp";

const AuthPage = props => {
  const handleSignIn = ({ email, password }) => props.signIn(email, password);
  const handleSignUp = ({ email, password }) => props.signUp(email, password);

  const renderBody = () => {
    if (props.singup) {
      return <SignUp onSubmit={handleSignUp} loading={props.loading} />;
    } else {
      return <SignIn onSubmit={handleSignIn} loading={props.loading} />;
    }
  };

  return (
    <div className={classes.AuthPage} style={{ background: `url(${props.bg})` }}>
      <div className="container container__padding container__small">
        <div className="centerblock background">{renderBody()}</div>
      </div>
    </div>
  );
};

export default connect(
  state => ({ loading: state[moduleName].loading }),
  { signUp, signIn }
)(AuthPage);
