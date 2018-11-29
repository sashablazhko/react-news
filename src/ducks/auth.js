import Auth from "../services/AuthService";
import { Record } from "immutable";

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
        .setIn(["user", "id"], payload.id)
        .setIn(["user", "accessToken"], payload.accessToken)
        .setIn(["user", "email"], payload.email)
        .setIn(["user", "name"], payload.name)
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

//TODO saga
export function signUp(email, password) {
  return dispatch => {
    dispatch({
      type: SIGN_UP_REQUEST,
    });

    Auth.signUp(email, password).then(
      res => {
        if (res.data.message === "Successfully created user!") {
          dispatch(signIn(email, password));
        } else {
          dispatch({
            type: SIGN_UP_ERROR,
          });
        }
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

export function signIn(email, password) {
  return dispatch => {
    dispatch({
      type: SIGN_IN_REQUEST,
    });

    Auth.login(email, password).then(
      res => {
        const { expires_in, access_token } = res.data;
        const expirationDate = new Date(new Date().getTime() + expires_in * 1000);

        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("email", email);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: {
            accessToken: access_token,
            email,
            expirationDate,
          },
        });
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
                const googleToken = user.getAuthResponse(true).id_token;
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
