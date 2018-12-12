import React, { Component } from "react";
import classes from "./SignUp.module.css";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";
import Loader from "../../UI/Loader/Loader";
import Button from "../../UI/Button/Button";
import ReCAPTCHA from "react-google-recaptcha";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.recaptchaRef = React.createRef();
    this.state = {
      recaptchaValue: null,
      validName: false,
      validPass: false,
    };
  }

  handleOnChange = recaptchaValue => {
    console.log("recaptchaValue", recaptchaValue);
    this.setState((state, props) => ({
      recaptchaValue,
    }));
  };

  handleSignUp = val => {
    if (this.state.recaptchaValue) {
      this.props.signUp(val.userName, val.userPass, this.state.recaptchaValue);
    }
  };

  validateName = val => {
    if (val) {
      this.setState(() => ({
        validName: true,
      }));
      return undefined;
    }
    this.setState(() => ({
      validName: false,
    }));
    return "Введите имя";
  };

  validatePass = val => {
    let answer = undefined;
    if (!val) {
      answer = "Введите пароль";
    } else if (val.length < 6) {
      answer = "Пароль не короче 6ти символов";
    } else {
      answer = undefined;
    }
    this.setState(() => ({
      validPass: !answer,
    }));
    return answer;
  };

  render() {
    const { loading } = this.props;
    return (
      <div className={classes.SignUp}>
        <h2>Регистрация</h2>
        <Form onSubmit={this.handleSignUp}>
          {({ handleSubmit, values, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Field name="userName" placeholder="Имя" validate={this.validateName}>
                {({ input, meta, placeholder }) => (
                  <div className="row">
                    <label>Имя</label>
                    <input {...input} placeholder={placeholder} autoComplete="username" />
                    {meta.error && meta.touched && <div className={classes.error}>{meta.error}</div>}
                  </div>
                )}
              </Field>
              <Field name="userPass" placeholder="Пароль" validate={this.validatePass}>
                {({ input, meta, placeholder }) => (
                  <div className="row">
                    <label>Пароль</label>
                    <input {...input} placeholder={placeholder} type="password" autoComplete="current-password" />
                    {meta.error && meta.touched && <div className={classes.error}>{meta.error}</div>}
                  </div>
                )}
              </Field>
              <div className="row">
                <ReCAPTCHA
                  ref={this.recaptchaRef}
                  sitekey="6Len338UAAAAACnubnwaaj--S1zY93FoZ-37Ie5n"
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="btnactions">
                <Button
                  type="submit"
                  view="primary"
                  disabled={!(this.state.validName && this.state.validPass && this.state.recaptchaValue)}
                >
                  Регистрация
                </Button>
                <Link to="/login">
                  <Button view="danger">Войти</Button>
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

export default SignUp;
