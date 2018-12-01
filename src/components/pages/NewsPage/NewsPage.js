import React, { Component } from "react";
import classes from "./NewsPage.module.css";
import { connect } from "react-redux";
import Loader from "../../UI/Loader/Loader";
import NewsCard from "../../NewsCard/NewsCard";

import { loadAllNews, moduleName } from "../../../ducks/news";
import { mapToArr } from "../../../helpers";

export class NewsPage extends Component {
  componentDidMount() {
    console.log("111", 111);
    const { loadedList, loadingList, loadAllNews } = this.props;
    if (!loadedList && !loadingList) loadAllNews();
  }

  render() {
    const { news, loadingList } = this.props;
    if (loadingList) return <Loader />;
    const newsElements = mapToArr(news).map(item => <NewsCard key={item._id} {...item.toJS()} />);

    return (
      <div className={classes.NewsPage} style={{ background: `url(${this.props.bg})` }}>
        <div className="container container__padding background">
          <ul>{newsElements}</ul>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    news: state[moduleName].entities,
    loadedList: state[moduleName].loadedList,
    loadingList: state[moduleName].loadingList,
  }),
  { loadAllNews }
)(NewsPage);
