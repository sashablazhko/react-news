import React, { Component } from "react";
import { Link } from "react-router-dom";
import emailValidator from "email-validator";
import Loader from "../../UI/Loader/Loader";
import { ReCaptcha } from "react-recaptcha-google";

class SignUp extends Component {
  constructor(props, context) {
    super(props, context);
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }

  componentDidMount() {
    if (this.captchaDemo) {
      console.log("started, just a second...");
      this.captchaDemo.reset();
    }
  }
  onLoadRecaptcha() {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }
  verifyCallback(recaptchaToken) {
    // Here you will get the final recaptchaToken!!!
    console.log(recaptchaToken, "<= your recaptcha token");
  }

  render() {
    const { handleSubmit, loading } = this.props;
    // return (
    //   <div>
    //     <h2>Регистрация</h2>
    //     <form onSubmit={handleSubmit}>
    //       <div>
    //         <Field name="email" label="email" component={ErrorFormField} />
    //       </div>
    //       <div>
    //         <Field name="password" label="пароль" component={ErrorFormField} type="password" />
    //       </div>
    //       <div className="btn__wrapper">
    //         <div>
    //           <button type="submit">Регистрация</button>
    //         </div>
    //         {loading && <Loader />}
    //       </div>
    //     </form>
    //     <hr />
    //     <Link to="/auth/signin">Вход</Link>
    //   </div>
    // );
    return (
      <div>
        <ReCaptcha
          ref={el => {
            this.captchaDemo = el;
          }}
          size="normal"
          data-theme="dark"
          render="explicit"
          sitekey="6Len338UAAAAACnubnwaaj--S1zY93FoZ-37Ie5n"
          onloadCallback={this.onLoadRecaptcha}
          verifyCallback={this.verifyCallback}
        />
      </div>
    );
  }
}

const validate = ({ email, password }) => {
  const errors = {};

  if (!email) errors.email = "Введите email";
  else if (!emailValidator.validate(email)) errors.email = "Некорректный email";

  if (!password) errors.password = "Введите пароль";
  else if (password.length < 3) errors.password = "Не менее 3х символов";

  return errors;
};

export default SignUp;
