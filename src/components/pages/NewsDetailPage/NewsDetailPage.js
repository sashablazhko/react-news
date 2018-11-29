import React, { Component } from "react";
import classes from "./NewsDetailPage.module.css";
import classesCard from "../../NewsCard/NewsCard.module.css";
import { connect } from "react-redux";
import { moduleName } from "../../../ducks/news";

export class NewsDetailPage extends Component {
  render() {
    console.log("props", this.props);
    const { item } = this.props;
    const createDateFormated = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(new Date());
    return (
      <div className={classesCard.NewsDetailPage}>
        <div className="container background">
          <div className={classesCard.card}>
            <p>{this.props.match.params.newsId}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state, ownProps) => {
  console.log("ownProps", ownProps);
  return {
    item: state[moduleName].entities.get(ownProps.match.params.newsId),
  };
})(NewsDetailPage);
