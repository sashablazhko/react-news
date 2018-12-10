import React from "react";
import classes from "./NotFound.module.css";
import { Link } from "react-router-dom";

import bg from "../../../resources/images/bg.jpg";
import Button from "../../UI/Button/Button";

const NotFound = () => {
  return (
    <div className={classes.NotFound} style={{ background: `url(${bg})` }}>
      <div className="container container__padding container__small">
        <div className="centerblock background">
          <div className={classes.item}>
            <h2>Упс! Страница не найдена</h2>
            <hr />
            <Link to="/">
              <Button view="primary">на главную страницу</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
