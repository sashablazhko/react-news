import React, { Component } from "react";
import classes from "./NewsEditPage.module.css";
import { connect } from "react-redux";

import { createNews, editNews, deleteNews, moduleName as editDuck } from "../../../ducks/edit";
import { moduleName as newsDuck, loadNewsItem } from "../../../ducks/news";
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

  handleCreate = ({ email, password }) => this.props.createNews(email, password);
  handleEdit = ({ email, password }) => this.props.editNews(email, password);
  handleDelete = ({ email, password }) => this.props.deleteNews(email, password);

  render() {
    if (this.props.loadingItem || !this.props.loadedItem) return <Loader />;

    const editOrCreate = () => {
      if (this.props.create) {
        return <NewsEdit onSubmit={this.handleCreate} loading={this.props.loadingItem} chancelPath="/" />;
      } else {
        return (
          <NewsEdit
            onSubmit={this.handleEdit}
            onDelete={this.handleDelete}
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
    loadingItem: state[newsDuck].loadingItem,
  };
  if (props.match && props.match.params.newsId) {
    obj.item = state[newsDuck].entities.get(props.match.params.newsId);
    obj.loadedItem = state[newsDuck].entities.has(props.match.params.newsId);
  } else {
    obj.loadedItem = true;
  }
  return obj;
};

export default connect(
  mapStateToProps,
  { createNews, editNews, deleteNews, loadNewsItem }
)(NewsEditPage);
