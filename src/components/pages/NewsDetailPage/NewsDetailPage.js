import React, { Component } from "react";
import classes from "./NewsDetailPage.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { moduleName, loadNewsItem, deleteNews } from "../../../ducks/news";
import Loader from "../../UI/Loader/Loader";
import Button from "../../UI/Button/Button";
import IconActions from "../../UI/IconActions/IconActions";

export class NewsDetailPage extends Component {
  componentDidMount() {
    const { loadingItem, loadedItem } = this.props;
    if (!loadingItem && !loadedItem) {
      this.props.loadNewsItem(this.props.match.params.newsId);
    }
  }

  render() {
    if (this.props.loadingItem || !this.props.loadedItem) return <Loader />;
    const { content, createDate, title } = this.props.item;
    const createDateFormated = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(new Date(createDate));
    const usersNews = this.props.userId === this.props.item.creator._id;
    return (
      <div className={classes.NewsDetailPage}>
        <div className="container">
          <div className={classes.card}>
            <h2 className={classes.title}>{title}</h2>
            <div className={classes.info}>
              <span className="creator">{this.props.item.creator.displayName}</span> /{" "}
              <span className="date">{createDateFormated}</span>
            </div>
            <div className="content">{content}</div>
            {usersNews && (
              <IconActions
                id={this.props.item._id}
                deleteNews={() =>
                  window.confirm("Вы точно хотите удалить новость?") && this.props.deleteNews(this.props.item._id)
                }
              />
            )}
          </div>
          {usersNews && (
            <div className="btnactions">
              <Link to={`/news/${this.props.item._id}/edit`}>
                <Button view="primary">Редактировать</Button>
              </Link>
              <Button
                view="danger"
                onClick={() =>
                  window.confirm("Вы точно хотите удалить новость?") && this.props.deleteNews(this.props.item._id)
                }
              >
                Удалить
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => {
    return {
      item: state[moduleName].entities.get(ownProps.match.params.newsId),
      loadingItem: state[moduleName].loadingItem,
      loadedItem: state[moduleName].entities.has(ownProps.match.params.newsId),
      userId: state.auth.user.id,
    };
  },
  { loadNewsItem, deleteNews }
)(NewsDetailPage);
