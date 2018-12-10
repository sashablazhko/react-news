import React from "react";
import { connect } from "react-redux";

import { signInGoogle, signOutGoogle } from "../../../../ducks/auth";

const AuthSubmenuGoogle = ({ authorized, signOutGoogle, signInGoogle }) => {
  const renderBody = authorized ? (
    <li onClick={signOutGoogle}>Выйти</li>
  ) : (
    <li onClick={signInGoogle}>Войти через google</li>
  );
  return renderBody;
};

export default connect(
  null,
  { signInGoogle, signOutGoogle }
)(AuthSubmenuGoogle);
