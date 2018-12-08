import React from "react";
import classes from "./AuthPage.module.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { signInGoogle, moduleName } from "../../../ducks/auth";
import SignIn from "../../auth/SignIn/SignIn";
import bg from "../../../resources/images/bg.jpg";

const AuthPage = ({ signInGoogle, loading, redirectToReferrer, location }) => {
  const { from } = location.state || { from: { pathname: "/" } };
  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  const handleSignInGoogle = () => {
    signInGoogle();
  };

  return (
    <div className={classes.AuthPage} style={{ background: `url(${bg})` }}>
      <div className="container container__padding container__small">
        <div className="centerblock background">
          <SignIn signInGoogle={handleSignInGoogle} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({ loading: state[moduleName].loading, redirectToReferrer: state[moduleName].redirectToReferrer }),
  { signInGoogle }
)(AuthPage);
