import React from "react";
import classes from "./NewsCard.module.css";
import { Link } from "react-router-dom";
import { truncateString } from "../../helpers";
import IconActions from "../UI/IconActions/IconActions";

const NewsCard = ({ _id, title, createDate, content, deleteNews, usersNews, creator: { displayName } }) => {
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
        <span className="creator">{displayName}</span> / <span className="date">{createDateFormated}</span>
      </div>
      <div className="content">{content.length < 200 ? content : truncateString(content)}</div>
      {usersNews && <IconActions id={_id} deleteNews={deleteNews} />}
    </li>
  );
};

export default NewsCard;
