import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "../../UI/Loader/Loader";
import NewsCard from "../../NewsCard/NewsCard";

import { loadAllNews, moduleName } from "../../../ducks/news";
import { mapToArr } from "../../../helpers";

export class NewsPage extends Component {
  componentDidMount() {
    const { loaded, loading, loadAllNews } = this.props;
    if (!loaded && !loading) loadAllNews();
  }

  render() {
    const { news, loading } = this.props;
    if (loading) return <Loader />;
    const newsElements = mapToArr(news).map(item => <NewsCard key={item._id} {...item.toJS()} />);

    return <ul>{newsElements}</ul>;
  }
}

export default connect(
  state => ({
    news: state[moduleName].entities,
    loaded: state[moduleName].loaded,
    loading: state[moduleName].loading,
  }),
  { loadAllNews }
)(NewsPage);
