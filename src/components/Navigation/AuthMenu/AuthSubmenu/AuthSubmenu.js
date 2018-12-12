import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { signInGoogle, signOutGoogle, signOut } from "../../../../ducks/auth";

const AuthSubmenuGoogle = ({ authorized, email, signOutGoogle, signOut, signInGoogle }) => {
  const exitFn = email ? signOutGoogle : signOut;
  const renderBody = authorized ? (
    <li onClick={exitFn}>Выйти</li>
  ) : (
    <React.Fragment>
      <li>
        <Link to="/login">Login</Link>
      </li>

      <li onClick={signInGoogle}>Войти через google</li>
    </React.Fragment>
  );
  return renderBody;
};

export default connect(
  null,
  { signInGoogle, signOutGoogle, signOut }
)(AuthSubmenuGoogle);
