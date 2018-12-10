import React, { Component } from "react";
import classes from "./NewsEdit.module.css";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";

import Loader from "../UI/Loader/Loader";
import Button from "../UI/Button/Button";

export class NewsEdit extends Component {
  render() {
    const { item, onSubmit, chancelPath, loading } = this.props;

    // const sleep = ms => new Promise(res => setTimeout(res, ms));
    // const showResult = async val => {
    //   await sleep(300);
    //   window.alert(JSON.stringify(val, undefined, 4));
    // };
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
        <Form onSubmit={onSubmit} initialValues={initData}>
          {({ handleSubmit, values, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Field name="title" placeholder="Заголовок" validate={validateTitle}>
                {({ input, meta, placeholder }) => (
                  <div className="row">
                    <label>Заголовок</label>
                    <input {...input} placeholder={placeholder} />
                    {meta.error && meta.touched && <div className={classes.error}>{meta.error}</div>}
                  </div>
                )}
              </Field>
              <Field name="content" placeholder="Заголовок" validate={validateContent}>
                {({ input, meta, placeholder }) => (
                  <div className="row">
                    <label>Текст</label>
                    <textarea {...input} placeholder={placeholder} />
                    {meta.error && meta.touched && <div className={classes.error}>{meta.error}</div>}
                  </div>
                )}
              </Field>
              <div className="btnactions">
                <Button type="submit" view="primary">
                  {!item ? "Создать" : "Сохранить"}
                </Button>
                <Link to={chancelPath}>
                  <Button view="danger">Отменить</Button>
                </Link>
              </div>
              {loading && <Loader />}
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

export default NewsEdit;
