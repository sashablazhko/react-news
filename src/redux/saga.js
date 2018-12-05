import { saga as editSaga } from "../ducks/edit";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([editSaga()]);
}
