import React, { Component } from "react";
import classes from "./NewsEditPage.module.css";
import { connect } from "react-redux";

import { createNews, editNews, deleteNews, moduleName, loadNewsItem } from "../../../ducks/news";
import NewsEdit from "../../NewsEdit/NewsEdit";

class NewsEditPage extends Component {
  state = {};
  static getDerivedStateFromProps(props) {
    if (!!props.match && !!props.match.params.newsId && !props.loadingItem && !props.loadedItem) {
      props.loadNewsItem(props.match.params.newsId);
    }
    return {};
  }

  handleCreate = ({ title, content }) => this.props.createNews(title, content);
  handleEdit = ({ title, content }) => this.props.editNews(title, content, this.props.item._id);
  handleDelete = () => this.props.deleteNews(this.props.item._id);

  render() {
    const { item, create, loadingItem } = this.props;

    const editOrCreate = () => {
      if (create) {
        return <NewsEdit onSubmit={this.handleCreate} loading={loadingItem} chancelPath="/" />;
      } else if (item) {
        return (
          <NewsEdit onSubmit={this.handleEdit} item={item} loading={loadingItem} chancelPath={`/news/${item._id}`} />
        );
      } else {
        return null;
      }
    };
    return (
      <div className={classes.NewsEditPage}>
        <div className="container container__padding background">{editOrCreate()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  let obj = {
    loadingItem: state[moduleName].loadingItem,
  };
  if (props.match && props.match.params.newsId) {
    obj.item = state[moduleName].entities.get(props.match.params.newsId);
    obj.loadedItem = state[moduleName].entities.has(props.match.params.newsId);
  } else {
    obj.loadedItem = true;
  }
  return obj;
};

export default connect(
  mapStateToProps,
  { createNews, editNews, deleteNews, loadNewsItem }
)(NewsEditPage);
