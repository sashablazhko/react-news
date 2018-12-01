import React, { Component } from "react";
import classes from "./NewsEdit.module.css";
import { reduxForm, Field } from "redux-form";

import { compose } from "redux";
import { connect } from "react-redux";
import { moduleName } from "../../ducks/edit";

import ErrorInputField from "../UI/ErrorInputField/ErrorInputField";
import ErrorTextareaField from "../UI/ErrorTextareaField/ErrorTextareaField";

export class NewsEdit extends Component {
  render() {
    const { create } = this.props;
    return (
      <div>
        <h2>{create ? "Создать новость" : "Редактировать новость"}</h2>
        <form>
          <div>
            <Field name="title" label="Заголовок" component={ErrorInputField} />
          </div>
          <div>
            <Field name="content" label="Текст" component={ErrorTextareaField} type="textarea" />
          </div>
          <div className="btn__wrapper">
            <div>
              <button type="submit">Регистрация</button>
            </div>
            {/* {loading && <Loader />} */}
          </div>
        </form>
      </div>
    );
  }
}

const validate = ({ title, content }) => {
  const errors = {};

  if (!title) errors.title = "Введите заголовок";
  else if (title.length < 1) errors.title = "Заголовок новости слишком короткий";

  if (!content) errors.content = "Введите текст новости";
  else if (content.length < 3) errors.content = "Текст новости слишком короткий";

  return errors;
};

// NewsEdit = reduxForm({
//   form: "editOrCreate",
//   validate,
//   enableReinitialize: true,
// })(NewsEdit);

// export default connect(
//   state => {
//     console.log("state", state[moduleName].test);
//     return {
//       initialValues: state[moduleName].test,
//     };
//   },
//   null,
//   null,
//   { pure: false }
// )(NewsEdit);
export default compose(
  connect(state => {
    console.log("state", state[moduleName].test);
    return {
      initialValues: state[moduleName].test,
    };
  }),
  reduxForm({
    form: "editOrCreate",
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
  })
)(NewsEdit);
