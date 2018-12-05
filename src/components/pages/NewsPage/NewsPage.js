import React, { Component } from "react";
import classes from "./NewsPage.module.css";
import { connect } from "react-redux";
import Loader from "../../UI/Loader/Loader";
import NewsCard from "../../NewsCard/NewsCard";

import { loadAllNews, deleteNews, moduleName } from "../../../ducks/news";
import { mapToArr } from "../../../helpers";
import bg from "../../../resources/images/bg.jpg";

export class NewsPage extends Component {
  componentDidMount() {
    const { loadedList, loadingList, loadAllNews } = this.props;
    if (!loadedList && !loadingList) loadAllNews();
  }

  render() {
    const { news, loadingList, userId } = this.props;
    if (loadingList) return <Loader />;
    const newsElements = mapToArr(news).map(item => (
      <NewsCard
        deleteNews={() => window.confirm("Вы точно хотите удалить новость?") && this.props.deleteNews(item._id)}
        key={item._id}
        usersNews={userId === item.creator._id}
        {...item.toJS()}
      />
    ));

    return (
      <div className={classes.NewsPage} style={{ background: `url(${bg})` }}>
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
    userId: state.auth.user.id,
  }),
  { loadAllNews, deleteNews }
)(NewsPage);
