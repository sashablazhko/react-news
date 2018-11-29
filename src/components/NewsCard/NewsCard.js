import React from "react";
import classes from "./NewsCard.module.css";
import { Link } from "react-router-dom";
import { truncateString } from "../../helpers";

const NewsCard = props => {
  const { _id, title, createDate, content } = props;
  const createDateFormated = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(createDate));
  return (
    <li className={classes.NewsCard}>
      <h2 className={classes.title}>
        <Link to={`/news/${_id}`}>{title}</Link>
      </h2>
      <div className={classes.info}>
        <span className="creator">{props.creator.displayName}</span> /{" "}
        <span className="date">{createDateFormated}</span>
      </div>
      <div className="content">{content.length < 200 ? content : truncateString(content)}</div>
    </li>
  );
};

export default NewsCard;
