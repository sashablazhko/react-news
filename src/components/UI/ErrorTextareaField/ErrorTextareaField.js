import React from "react";
import classes from "./ErrorTextareaField.module.css";

const ErrorTextareaField = props => {
  const {
    input,
    label,
    type,
    meta: { error, touched },
  } = props;
  const errorText = touched && error && <div className={classes.error}>{error}</div>;
  return (
    <div className={classes.ErrorTextareaField}>
      <label>{label}</label>
      <textarea {...input} type={type} />
      {errorText}
    </div>
  );
};

export default ErrorTextareaField;
