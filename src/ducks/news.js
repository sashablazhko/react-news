import { OrderedMap, Record } from "immutable";
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
  loading: false,
  loaded: false,
  error: null,
  errorMsg: null,
});

export const moduleName = "news";
export const FETCH_ALL_NEWS_REQUEST = `${moduleName}/FETCH_ALL_NEWS_REQUEST`;
export const FETCH_ALL_NEWS_SECCESS = `${moduleName}/FETCH_ALL_NEWS_SECCESS`;
export const FETCH_ALL_NEWS_ERROR = `${moduleName}/FETCH_ALL_NEWS_ERROR`;

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL_NEWS_REQUEST: {
      return state.set("loading", true);
    }

    case FETCH_ALL_NEWS_SECCESS:
      return state
        .set("loading", false)
        .set("loaded", true)
        .set("error", null)
        .update("entities", entities => arrToMap(payload.news, "_id", NewsRecord).merge(entities));

    case FETCH_ALL_NEWS_ERROR:
      return state
        .set("loading", false)
        .set("error", true)
        .set("errorMsg", "Проблемы с загрузкой статей");

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
