import React from "react";
import { render } from "react-dom";
import App from "../App/App";
import { Provider } from "react-redux";
import store from "../../redux";
import { ConnectedRouter } from "connected-react-router";
import history from "../../history";

const RootApp = () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  );
};
RootApp();

if (module.hot) {
  module.hot.accept();
}
