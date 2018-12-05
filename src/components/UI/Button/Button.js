import React from "react";
import classes from "./Button.module.css";

const Button = props => {
  const cls = [classes.Button, classes[props.view]];
  return (
    <button onClick={props.onClick} className={cls.join(" ")} disabled={props.disabled} type={props.type}>
      {props.children}
    </button>
  );
};

export default Button;
