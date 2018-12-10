import { OrderedMap, Record } from "immutable";
import { all, take, put, select, call } from "redux-saga/effects";
import { push } from "connected-react-router";

import News from "../services/NewsService";
import { arrToMap } from "../helpers";

const creatorRecord = Record({
  _id: null,
  displayName: null,
});

const NewsRecord = Record({
  _id: null,
  title: null,
  content: null,
  creator: new creatorRecord(),
  createDate: null,
});

const ReducerState = Record({
  entities: new OrderedMap({}),
  loadingList: false,
  loadedList: false,
  loadingItem: false,
  error: null,
  errorMsg: null,
  searchTerm: "",
});

export const moduleName = "news";
export const FETCH_ALL_NEWS_REQUEST = `${moduleName}/FETCH_ALL_NEWS_REQUEST`;
export const FETCH_ALL_NEWS_SECCESS = `${moduleName}/FETCH_ALL_NEWS_SECCESS`;
export const FETCH_ALL_NEWS_ERROR = `${moduleName}/FETCH_ALL_NEWS_ERROR`;
export const API_NEWS_ITEM_REQUEST = `${moduleName}/API_NEWS_ITEM_REQUEST`;
export const API_NEWS_ITEM_SECCESS = `${moduleName}/API_NEWS_ITEM_SECCESS`;
export const FETCH_NEWS_ITEM_ERROR = `${moduleName}/FETCH_NEWS_ITEM_ERROR`;
export const EDIT_NEWS = `${moduleName}/EDIT_NEWS`;
export const EDIT_NEWS_ERROR = `${moduleName}/EDIT_NEWS_ERROR`;
export const CREATE_NEWS = `${moduleName}/CREATE_NEWS`;
export const CREATE_NEWS_REQUEST = `${moduleName}/CREATE_NEWS_REQUEST`;
export const CREATE_NEWS_SUCCESS = `${moduleName}/CREATE_NEWS_SUCCESS`;
export const CREATE_NEWS_ERROR = `${moduleName}/CREATE_NEWS_ERROR`;
export const DELETE_NEWS = `${moduleName}/DELETE_NEWS`;
export const DELETE_NEWS_SUCCESS = `${moduleName}/DELETE_NEWS_SUCCESS`;
export const DELETE_NEWS_ERROR = `${moduleName}/DELETE_NEWS_ERROR`;
export const SET_SEARCH_TERM = `${moduleName}/SET_SEARCH_TERM`;

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL_NEWS_REQUEST: {
      return state.set("loadingList", true);
    }

    case API_NEWS_ITEM_REQUEST: {
      return state.set("loadingItem", true);
    }

    case FETCH_ALL_NEWS_SECCESS:
      return state
        .set("loadingList", false)
        .set("loadedList", true)
        .set("error", null)
        .update("entities", entities => arrToMap(payload.news, "_id", NewsRecord).merge(entities));

    case API_NEWS_ITEM_SECCESS:
      return state
        .set("loadingItem", false)
        .set("error", null)
        .update("entities", entities => entities.merge(arrToMap([payload.item], "_id", NewsRecord)));

    case DELETE_NEWS_SUCCESS:
      return (
        state
          .set("loadingItem", false)
          .set("error", null)
          // .remove("entities", payload.id)
          .update("entities", entities => entities.remove(payload.id))
      );

    case FETCH_ALL_NEWS_ERROR:
      return state
        .set("loadingList", false)
        .set("error", true)
        .set("errorMsg", "Проблемы с загрузкой статей");

    case FETCH_NEWS_ITEM_ERROR:
      return state
        .set("loadingItem", false)
        .set("error", true)
        .set("errorMsg", "Проблемы с загрузкой статьи");

    case EDIT_NEWS_ERROR:
      return state
        .set("loadingItem", false)
        .set("error", true)
        .set("errorMsg", "Проблемы с редактированием");

    case DELETE_NEWS_ERROR:
      return state
        .set("loadingItem", false)
        .set("error", true)
        .set("errorMsg", "Проблемы с удалением");

    case SET_SEARCH_TERM:
      return state.set("searchTerm", payload);

    default:
      return state;
  }
}

export function loadAllNews() {
  return dispatch => {
    dispatch({
      type: FETCH_ALL_NEWS_REQUEST,
    });

    News.getAllNews().then(
      res => {
        dispatch({
          type: FETCH_ALL_NEWS_SECCESS,
          payload: {
            news: res.data.feeds,
          },
        });
      },
      err => {
        console.log("LOAD ALL NEWS ERR", err);
        dispatch({
          type: FETCH_ALL_NEWS_ERROR,
          err,
        });
      }
    );
  };
}

export function loadNewsItem(newsId) {
  return dispatch => {
    dispatch({
      type: API_NEWS_ITEM_REQUEST,
    });

    News.getNewsItem(newsId).then(
      res => {
        dispatch({
          type: API_NEWS_ITEM_SECCESS,
          payload: {
            item: res.data.feed,
          },
        });
      },
      err => {
        console.log("LOAD  NEWS ITEM ERR", err);
        dispatch({
          type: FETCH_NEWS_ITEM_ERROR,
          err,
        });
        dispatch(push("/notfound"));
      }
    );
  };
}

export function createNews(title, content) {
  return {
    type: CREATE_NEWS,
    payload: { title, content },
  };
}

const createNewsSaga = function*() {
  while (true) {
    const action = yield take(CREATE_NEWS);

    yield put({
      type: CREATE_NEWS,
    });

    try {
      const getToken = state => state.auth.user.accessToken;
      const token = yield select(getToken);
      const editData = yield call(News.createNews, action.payload.title, action.payload.content, token);
      console.log("editData", editData);
      yield put({
        type: API_NEWS_ITEM_SECCESS,
        payload: {
          item: editData.data.feed,
        },
      });
      yield put(push("/"));
    } catch (err) {
      console.log("err in createNewsSaga", err);
      yield put({
        type: CREATE_NEWS_ERROR,
        err,
      });
    }
  }
};

export function editNews(title, content, id) {
  return {
    type: EDIT_NEWS,
    payload: { title, content, id },
  };
}

const editNewsSaga = function*() {
  while (true) {
    const action = yield take(EDIT_NEWS);

    yield put({
      type: API_NEWS_ITEM_REQUEST,
    });

    try {
      const getToken = state => state.auth.user.accessToken;
      const token = yield select(getToken);
      const editData = yield call(
        News.updateNewsItem,
        action.payload.title,
        action.payload.content,
        action.payload.id,
        token
      );
      yield put({
        type: API_NEWS_ITEM_SECCESS,
        payload: {
          item: editData.data.feed,
        },
      });
      yield put(push(`/news/${action.payload.id}`));
    } catch (err) {
      console.log("err in editNewsSaga", err);
      yield put({
        type: EDIT_NEWS_ERROR,
        err,
      });
    }
  }
};

export function deleteNews(id) {
  return {
    type: DELETE_NEWS,
    payload: {
      id,
    },
  };
}

const deleteNewsSaga = function*() {
  while (true) {
    const action = yield take(DELETE_NEWS);

    yield put({
      type: API_NEWS_ITEM_REQUEST,
    });

    try {
      const getToken = state => state.auth.user.accessToken;
      const token = yield select(getToken);
      const editData = yield call(News.deleteNewsItem, action.payload.id, token);
      console.log("editData", editData);
      yield put({
        type: DELETE_NEWS_SUCCESS,
        payload: {
          id: editData.data._id,
        },
      });
      yield put(push("/"));
    } catch (err) {
      console.log("err in deleteNewsSaga", err);
      yield put({
        type: DELETE_NEWS_ERROR,
        err,
      });
    }
  }
};

export function handleSearchTermChange(searchTerm) {
  return {
    type: SET_SEARCH_TERM,
    payload: searchTerm,
  };
}

export const saga = function*() {
  yield all([editNewsSaga(), createNewsSaga(), deleteNewsSaga()]);
};
