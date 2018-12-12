import React, { Component } from "react";
import classes from "./AuthPage.module.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { signInGoogle, signUp, signIn, moduleName } from "../../../ducks/auth";
import SignIn from "../../auth/SignIn/SignIn";
import SignUp from "../../auth/SignUp/SignUp";
import bg from "../../../resources/images/bg.jpg";

// const AuthPage = ({ signup, signInGoogle, loading, redirectToReferrer, location }) => {
class AuthPage extends Component {
  render() {
    const { signup, signUp, signIn, signInGoogle, loading, redirectToReferrer, location } = this.props;
    const { from } = location.state || { from: { pathname: "/" } };
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    const handleSignUp = (userName, userPass, gRecaptchaResponse) => {
      signUp(userName, userPass, gRecaptchaResponse);
    };

    const handleSignIn = ({ userName, userPass }) => {
      signIn(userName, userPass);
    };

    const handleSignInGoogle = () => {
      signInGoogle();
    };

    const renderBody = () => {
      if (signup) {
        return <SignUp signUp={handleSignUp} loading={loading} />;
      } else {
        return <SignIn singIn={handleSignIn} signInGoogle={handleSignInGoogle} loading={loading} />;
      }
    };

    return (
      <div className={classes.AuthPage} style={{ background: `url(${bg})` }}>
        <div className="container container__padding container__small">
          <div className="centerblock background">{renderBody()}</div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ loading: state[moduleName].loading, redirectToReferrer: state[moduleName].redirectToReferrer }),
  { signInGoogle, signUp, signIn }
)(AuthPage);
