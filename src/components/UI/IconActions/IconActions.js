import React from "react";
import { Link } from "react-router-dom";

const IconActions = ({ id, deleteNews }) => {
  return (
    <div className="action">
      <div className="edit">
        <Link to={`/news/${id}/edit`}>
          <i className="fas fa-pencil-alt" />
        </Link>
      </div>
      <div className="del" onClick={deleteNews}>
        <i className="fas fa-times" />
      </div>
    </div>
  );
};

export default IconActions;
