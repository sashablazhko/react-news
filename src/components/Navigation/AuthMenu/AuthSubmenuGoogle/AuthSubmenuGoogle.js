import React from "react";
import { connect } from "react-redux";

import { signInGoogle, signOutGoogle } from "../../../../ducks/auth";

const AuthSubmenuGoogle = props => {
  const renderBody = props.authorized ? (
    <li onClick={props.signOutGoogle}>Выйти</li>
  ) : (
    <li onClick={props.signInGoogle}>Войти через google</li>
  );
  return renderBody;
};

export default connect(
  null,
  { signInGoogle, signOutGoogle }
)(AuthSubmenuGoogle);
