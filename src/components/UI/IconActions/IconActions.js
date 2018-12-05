import React from "react";
import classes from "./IconActions.module.css";
import { Link } from "react-router-dom";

const IconActions = props => {
  return (
    <div className="action">
      <div className="edit">
        <Link to={`/news/${props.id}/edit`}>
          <i className="fas fa-pencil-alt" />
        </Link>
      </div>
      <div className="del" onClick={props.deleteNews}>
        <i className="fas fa-times" />
      </div>
    </div>
  );
};

export default IconActions;
