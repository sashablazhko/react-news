import React, { Component } from "react";
import classes from "./NewsEdit.module.css";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { moduleName, setDataOnEdit } from "../../ducks/edit";

export class NewsEdit extends Component {
  render() {
    const { item } = this.props;

    const sleep = ms => new Promise(res => setTimeout(res, ms));
    const showResult = async val => {
      await sleep(300);
      window.alert(JSON.stringify(val, undefined, 4));
    };
    let initData = undefined;
    if (item) {
      initData = {
        title: item.title,
        content: item.content,
      };
    }

    return (
      <div className={classes.NewsEdit}>
        <h2>{!item ? "Создать новость" : "Редактировать новость"}</h2>
        <Form onSubmit={showResult} initialValues={initData}>
          {({ handleSubmit, values, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Field name="title" placeholder="Заголовок" validate={validateTitle}>
                {({ input, meta, placeholder }) => (
                  <div>
                    <label>Заголовок</label>
                    <input {...input} placeholder={placeholder} />
                    {meta.error && meta.touched && <div className={classes.error}>{meta.error}</div>}
                  </div>
                )}
              </Field>
              <Field name="content" placeholder="Заголовок" validate={validateContent}>
                {({ input, meta, placeholder }) => (
                  <div>
                    <label>Текст</label>
                    <textarea {...input} placeholder={placeholder} />
                    {meta.error && meta.touched && <div className={classes.error}>{meta.error}</div>}
                  </div>
                )}
              </Field>
              <button type="submit">{!item ? "Создать" : "Сохранить"}</button>
              <Link to={this.props.chancelPath}>
                <button>Отменить</button>
              </Link>
              <pre>{JSON.stringify(values, undefined, 4)}</pre>
            </form>
          )}
        </Form>
      </div>
    );
  }
}

const validateTitle = val => (val ? undefined : "Введите заголовок");
const validateContent = val => {
  let answer = undefined;
  if (!val) {
    answer = "Введите заголовок";
  } else if (val.length < 3) {
    answer = "Текст новости слишком короткий";
  } else {
    answer = undefined;
  }
  return answer;
};

const validate = ({ title, content }) => {
  const errors = {};

  if (!title) errors.title = "Введите заголовок";
  else if (title.length < 1) errors.title = "Заголовок новости слишком короткий";

  if (!content) errors.content = "Введите текст новости";
  else if (content.length < 3) errors.content = "Текст новости слишком короткий";

  return errors;
};

export default NewsEdit;
