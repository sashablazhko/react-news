import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";

import bg from "../../resources/images/bg.jpg";
import ProtectedRoute from "../../hoc/ProtectedRoute/ProtectedRoute";
import Layout from "../../hoc/Layout/Layout";
import Loader from "../UI/Loader/Loader";
import NewsPage from "../pages/NewsPage/NewsPage";
import NewsDetailPage from "../pages/NewsDetailPage/NewsDetailPage";
import NewsEditlPage from "../pages/NewsEditlPage/NewsEditlPage";

const AsyncMyNewsPage = Loadable({
  loader: () => import("../pages/MyNewsPage/MyNewsPage"),
  loading: Loader,
});

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <ProtectedRoute path="/news/my" component={AsyncMyNewsPage} />
          <Route path="news/:newsId/edit" component={props => <NewsEditlPage bg={bg} {...props} />} />
          <Route path="/news/:newsId" component={NewsDetailPage} />
          <Route exact path="/" component={props => <NewsPage bg={bg} {...props} />} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
