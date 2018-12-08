import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { moduleName } from "../../ducks/auth";

export class ProtectedRoute extends Component {
  render() {
    const { component, ...rest } = this.props;
    return <Route {...rest} render={this.renderProtected} />;
  }

  renderProtected = routeProps => {
    const { component: ProtectedComponent, authorized, location } = this.props;
    return authorized ? (
      <ProtectedComponent {...routeProps} />
    ) : (
      <Redirect to={{ pathname: "/auth/signin", state: { from: location } }} />
    );
  };
}

export default connect(
  state => ({
    authorized: state[moduleName].user.expirationDate && new Date() < state[moduleName].user.expirationDate,
  }),
  null,
  null,
  { pure: false }
)(ProtectedRoute);
