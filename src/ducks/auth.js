import Auth from "../services/AuthService";
import { Record } from "immutable";
import { delay } from "redux-saga";
import { takeEvery, put, call, select } from "redux-saga/effects";

const UserRecord = Record({
  id: null,
  accessToken: null,
  email: null,
  name: null,
  expirationDate: null,
});

const ReducerState = Record({
  user: new UserRecord(),
  loading: false,
  redirectToReferrer: false,
  error: null,
  errorMsg: null,
});

export const moduleName = "auth";
export const SIGN_UP_REQUEST = `${moduleName}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${moduleName}/SIGN_UP_SUCCESS`;
export const SIGN_UP_ERROR = `${moduleName}/SIGN_UP_ERROR`;
export const SIGN_IN_REQUEST = `${moduleName}/SIGN_IN_REQUEST`;
export const SIGN_IN_SUCCESS = `${moduleName}/SIGN_IN_SUCCESS`;
export const SIGN_IN_ERROR = `${moduleName}/SIGN_IN_ERROR`;
export const SIGN_IN_REFRESH = `${moduleName}/SIGN_IN_REFRESH`;
export const SIGN_IN_REFRESH_REQUEST = `${moduleName}/SIGN_IN_REFRESH_REQUEST`;
export const SIGN_IN_REFRESH_SUCCESS = `${moduleName}/SIGN_IN_REFRESH_SUCCESS`;
export const SIGN_IN_REFRESH_ERROR = `${moduleName}/SIGN_IN_REFRESH_ERROR`;
export const SIGN_OUT_REQUEST = `${moduleName}/SIGN_OUT_REQUEST`;
export const SIGN_OUT_SUCCESS = `${moduleName}/SIGN_OUT_SUCCESS`;
export const SIGN_OUT_ERROR = `${moduleName}/SIGN_OUT_ERROR`;

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action;

  switch (type) {
    case SIGN_UP_REQUEST:
      return state.set("loading", true);

    case SIGN_UP_SUCCESS:
      return state
        .set("loading", false)
        .set("error", null)
        .set("errorMsg", null);

    case SIGN_UP_ERROR:
      return state
        .set("loading", false)
        .set("error", true)
        .set("errorMsg", "Проблемы с регистрацией");

    case SIGN_IN_REQUEST:
      return state.set("loading", true);

    case SIGN_IN_SUCCESS:
      return state
        .set("loading", false)
        .set("error", null)
        .set("redirectToReferrer", true)
        .setIn(["user", "id"], payload.id)
        .setIn(["user", "accessToken"], payload.accessToken)
        .setIn(["user", "email"], payload.email)
        .setIn(["user", "name"], payload.name)
        .setIn(["user", "expirationDate"], payload.expirationDate);

    case SIGN_IN_REFRESH_SUCCESS:
      return state
        .setIn(["user", "accessToken"], payload.accessToken)
        .setIn(["user", "expirationDate"], payload.expirationDate);

    case SIGN_IN_ERROR:
      return state
        .set("loading", false)
        .set("error", true)
        .set("errorMsg", "Проблемы с авторизацией");

    case SIGN_OUT_SUCCESS:
      return new ReducerState();

    default:
      return state;
  }
}

export function singInSuccess(username, serverToken) {
  return dispatch => {
    const base64Url = serverToken.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const serverAuthRes = JSON.parse(window.atob(base64));
    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: {
        id: serverAuthRes.id,
        accessToken: serverToken,
        name: username,
        email: null,
        expirationDate: new Date(serverAuthRes.exp * 1000),
      },
    });
  };
}

export function signUp(username, password, gRecaptchaResponse) {
  return dispatch => {
    dispatch({
      type: SIGN_UP_REQUEST,
    });

    const user = { username, password, "g-recaptcha-response": gRecaptchaResponse };
    Auth.signUp(user).then(
      res => {
        dispatch(singInSuccess(username, res.data.token));
      },
      err => {
        console.log("SIGN UP ERR", err);
        dispatch({
          type: SIGN_UP_ERROR,
          err,
        });
      }
    );
  };
}

export function signIn(username, password) {
  return dispatch => {
    dispatch({
      type: SIGN_IN_REQUEST,
    });

    Auth.login(username, password).then(
      res => {
        dispatch(singInSuccess(username, res.data.token));
        // TODO REFRESH
      },
      err => {
        console.log("SIGN IN ERR", err);
        dispatch({
          type: SIGN_IN_ERROR,
          err,
        });
      }
    );
  };
}

export function signInGoogle() {
  return dispatch => {
    dispatch({
      type: SIGN_IN_REQUEST,
    });

    window.gapi.load("auth2", function() {
      window.gapi.auth2
        .init({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        })
        .then(
          GoogleAuth => {
            GoogleAuth.signIn({
              scope: "profile email",
            }).then(
              user => {
                const googleRes = user.getAuthResponse(true);
                console.log("googleResOld", googleRes);
                const googleToken = googleRes.id_token;
                Auth.getServerToken(googleToken).then(
                  res => {
                    const base64Url = res.data.token.split(".")[1];
                    const base64 = base64Url.replace("-", "+").replace("_", "/");
                    const serverAuthRes = JSON.parse(window.atob(base64));
                    dispatch({
                      type: SIGN_IN_SUCCESS,
                      payload: {
                        id: serverAuthRes.id,
                        accessToken: res.data.token,
                        name: user.getBasicProfile().getName(),
                        email: user.getBasicProfile().getEmail(),
                        expirationDate: new Date(serverAuthRes.exp * 1000),
                      },
                    });
                    dispatch(signInGoogleRefresh(1000 * 60 * 55));
                  },
                  err => {
                    console.log("SIGN IN LOCAL SERVICE ERR", err);
                    dispatch({
                      type: SIGN_IN_ERROR,
                      err,
                    });
                  }
                );
              },
              err => {
                console.log("SIGN IN GOOGLE ERR", err);
                dispatch({
                  type: SIGN_IN_ERROR,
                  err,
                });
              }
            );
          },
          err => {
            console.log("GOOGLE INIT ERR", err);
          }
        );
    });
  };
}

export function signOut() {
  return {
    type: SIGN_OUT_SUCCESS,
  };
}

export function signOutGoogle() {
  return dispatch => {
    const googleAuth = window.gapi.auth2.getAuthInstance();
    googleAuth.signOut().then(
      res => {
        dispatch({
          type: SIGN_OUT_SUCCESS,
        });
      },
      err => {
        console.log("SIGN OUT GOOGLE ERR", err);
        dispatch({
          type: SIGN_OUT_ERROR,
          err,
        });
      }
    );
  };
}

export function signInGoogleRefresh(ms = 1000 * 60 * 55) {
  return {
    type: SIGN_IN_REFRESH,
    payload: { ms },
  };
}

const signInGoogleRefreshSaga = function*(action) {
  yield call(delay, action.payload.ms);
  const getToken = state => state.auth.user.accessToken;
  const token = yield select(getToken);
  if (token) {
    yield put({
      type: SIGN_IN_REFRESH_REQUEST,
    });

    try {
      const googleRes = yield window.gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .reloadAuthResponse();
      console.log("googleResOldNew", googleRes);
      const googleToken = googleRes.id_token;
      const serverRes = yield call(Auth.getServerToken, googleToken);
      console.log("serverRes", serverRes);
      const base64Url = serverRes.data.token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      const serverAuthRes = JSON.parse(window.atob(base64));
      yield put({
        type: SIGN_IN_REFRESH_SUCCESS,
        payload: {
          accessToken: serverRes.data.token,
          expirationDate: new Date(serverAuthRes.exp * 1000),
        },
      });
    } catch (err) {
      yield put({
        type: SIGN_IN_REFRESH_ERROR,
        err,
      });
    }

    yield put({
      type: SIGN_IN_REFRESH,
      payload: { ms: action.payload.ms },
    });
  } else {
    console.log("Auto Refresh Token is stopped");
  }
};

export const saga = function*() {
  yield [takeEvery(SIGN_IN_REFRESH, signInGoogleRefreshSaga)];
};
