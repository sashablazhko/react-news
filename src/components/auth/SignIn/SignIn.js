import React, { Component } from "react";
import classes from "./SignIn.module.css";

import Loader from "../../UI/Loader/Loader";
import Button from "../../UI/Button/Button";

class SignIn extends Component {
  render() {
    const { signInGoogle, loading } = this.props;
    return (
      <div className={classes.SignIn}>
        <h2>Вход</h2>
        <hr />
        <Button view="primary" onClick={signInGoogle}>
          Войти через google
        </Button>
        {loading && <Loader />}
      </div>
    );
  }
}

export default SignIn;
