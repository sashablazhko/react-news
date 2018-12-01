import React from "react";
import classes from "./ErrorInputField.module.css";

const ErrorInputField = props => {
  const {
    input,
    label,
    type,
    meta: { error, touched },
  } = props;
  const errorText = touched && error && <div className={classes.error}>{error}</div>;
  return (
    <div className={classes.ErrorInputField}>
      <label>{label}</label>
      <input {...input} type={type} />
      {errorText}
    </div>
  );
};

export default ErrorInputField;
