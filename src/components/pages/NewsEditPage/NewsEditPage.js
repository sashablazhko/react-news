import React, { Component } from "react";
import classes from "./NewsEditPage.module.css";
import { connect } from "react-redux";

import { createNews, editNews, deleteNews, moduleName, loadNewsItem } from "../../../ducks/news";
import NewsEdit from "../../NewsEdit/NewsEdit";
import Loader from "../../UI/Loader/Loader";

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
    // if (this.props.loadingItem || !this.props.loadedItem) return <Loader />;

    const editOrCreate = () => {
      if (this.props.create) {
        return <NewsEdit onSubmit={this.handleCreate} loading={this.props.loadingItem} chancelPath="/" />;
      } else {
        return (
          <NewsEdit
            onSubmit={this.handleEdit}
            item={this.props.item}
            loading={this.props.loadingItem}
            chancelPath={`/news/${this.props.item._id}`}
          />
        );
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
