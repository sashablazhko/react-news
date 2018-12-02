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
  loadingList: false,
  loadedList: false,
  loadingItem: false,
  error: null,
  errorMsg: null,
});

export const moduleName = "news";
export const FETCH_ALL_NEWS_REQUEST = `${moduleName}/FETCH_ALL_NEWS_REQUEST`;
export const FETCH_ALL_NEWS_SECCESS = `${moduleName}/FETCH_ALL_NEWS_SECCESS`;
export const FETCH_ALL_NEWS_ERROR = `${moduleName}/FETCH_ALL_NEWS_ERROR`;
export const FETCH_NEWS_ITEM_REQUEST = `${moduleName}/FETCH_NEWS_ITEM_REQUEST`;
export const FETCH_NEWS_ITEM_SECCESS = `${moduleName}/FETCH_NEWS_ITEM_SECCESS`;
export const FETCH_NEWS_ITEM_ERROR = `${moduleName}/FETCH_NEWS_ITEM_ERROR`;

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL_NEWS_REQUEST: {
      return state.set("loadingList", true);
    }

    case FETCH_NEWS_ITEM_REQUEST: {
      return state.set("loadingItem", true);
    }

    case FETCH_ALL_NEWS_SECCESS:
      return state
        .set("loadingList", false)
        .set("loadedList", true)
        .set("error", null)
        .update("entities", entities => arrToMap(payload.news, "_id", NewsRecord).merge(entities));

    case FETCH_NEWS_ITEM_SECCESS:
      return state
        .set("loadingItem", false)
        .set("error", null)
        .update("entities", entities => arrToMap([payload.item], "_id", NewsRecord).merge(entities));

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
      type: FETCH_NEWS_ITEM_REQUEST,
    });

    News.getNewsItem(newsId).then(
      res => {
        dispatch({
          type: FETCH_NEWS_ITEM_SECCESS,
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
      }
    );
  };
}
