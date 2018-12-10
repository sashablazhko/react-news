import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";

import ProtectedRoute from "../../hoc/ProtectedRoute/ProtectedRoute";
import Layout from "../../hoc/Layout/Layout";
import Loader from "../UI/Loader/Loader";
import NewsPage from "../pages/NewsPage/NewsPage";
import NewsDetailPage from "../pages/NewsDetailPage/NewsDetailPage";
import NewsEditPage from "../pages/NewsEditPage/NewsEditPage";
import AuthPage from "../pages/AuthPage/AuthPage";
import NotFound from "../pages/NotFound/NotFound";

const AsyncMyCabinet = Loadable({
  loader: () => import("../pages/MyCabinet/MyCabinet"),
  loading: Loader,
});

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <ProtectedRoute path="/news/:newsId/edit" component={NewsEditPage} />
          <ProtectedRoute path="/news/new" component={() => <NewsEditPage create />} />
          <Route path="/news/my" component={AsyncMyCabinet} />
          <Route path="/news/:newsId" component={NewsDetailPage} />
          <Route path="/auth/signin" component={AuthPage} />
          <Route exact path="/" component={NewsPage} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
