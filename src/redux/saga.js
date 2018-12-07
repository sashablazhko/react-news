import { saga as newsSaga } from "../ducks/news";
import { saga as authSaga } from "../ducks/auth";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([newsSaga(), authSaga()]);
}
