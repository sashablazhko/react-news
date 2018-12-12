import React from "react";
import classes from "./SignIn.module.css";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";

import Loader from "../../UI/Loader/Loader";
import Button from "../../UI/Button/Button";

const SignIn = ({ signInGoogle, loading, singIn }) => {
  return (
    <div className={classes.SignIn}>
      <h2>Вход</h2>
      <Form onSubmit={singIn}>
        {({ handleSubmit, values, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Field name="userName" placeholder="Имя" validate={validateName}>
              {({ input, meta, placeholder }) => (
                <div className="row">
                  <label>Имя</label>
                  <input {...input} placeholder={placeholder} autoComplete="username" />
                  {meta.error && meta.touched && <div className={classes.error}>{meta.error}</div>}
                </div>
              )}
            </Field>
            <Field name="userPass" placeholder="Пароль" validate={validatePass}>
              {({ input, meta, placeholder }) => (
                <div className="row">
                  <label>Пароль</label>
                  <input {...input} placeholder={placeholder} type="password" autoComplete="current-password" />
                  {meta.error && meta.touched && <div className={classes.error}>{meta.error}</div>}
                </div>
              )}
            </Field>
            <div className="btnactions">
              <Button type="submit" view="primary">
                Войти
              </Button>
              <Link to="/signup">
                <Button view="danger">Регистрация</Button>
              </Link>
            </div>
          </form>
        )}
      </Form>
      <hr />
      <Button view="primary" onClick={signInGoogle}>
        Войти через google
      </Button>
      {loading && <Loader />}
    </div>
  );
};

const validateName = val => (val ? undefined : "Введите имя");
const validatePass = val => {
  let answer = undefined;
  if (!val) {
    answer = "Введите пароль";
  } else if (val.length < 6) {
    answer = "Пароль не короче 6ти символов";
  } else {
    answer = undefined;
  }
  return answer;
};

export default SignIn;
