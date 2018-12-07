import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import { Provider } from "react-redux";
import store from "./redux";
import { ConnectedRouter } from "connected-react-router";
import history from "./history";

// const app = (
//   <Provider store={store}>
//     <ConnectedRouter history={history}>
//       <App />
//     </ConnectedRouter>
//   </Provider>
// );

// ReactDOM.render(app, document.getElementById("root"));

// if (module.hot) {
//   module.hot.accept();
// }

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
  );
};
renderApp();

if (module.hot) {
  // only need replace entry point
  module.hot.accept("./index.js", () => {
    renderApp();
  });
}
