import React from "react";
import classes from "./NewsEditPage.module.css";
import { connect } from "react-redux";

import { createNews, editNews, deleteNews, moduleName } from "../../../ducks/edit";
import NewsEdit from "../../NewsEdit/NewsEdit";

const NewsEditPage = props => {
  const handleCreate = ({ email, password }) => props.signIn(email, password);
  const handleEdit = ({ email, password }) => props.signUp(email, password);
  const handleDelete = ({ email, password }) => props.signUp(email, password);

  const editOrCreate = () => {
    if (props.create) {
      return <NewsEdit onSubmit={handleCreate} loading={props.loading} create />;
    } else {
      return (
        <NewsEdit
          onSubmit={handleEdit}
          onDelete={handleDelete}
          id={props.match.params.newsId}
          loading={props.loading}
        />
      );
    }
  };

  return (
    <div className={classes.NewsEditPage}>
      <div className="container container__padding background">{editOrCreate()}</div>
    </div>
  );
};

export default connect(
  state => ({ loading: state[moduleName].loading }),
  { createNews, editNews, deleteNews }
)(NewsEditPage);
