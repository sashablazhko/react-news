import { createSelector } from "reselect";
import { mapToArr } from "../helpers";

const searchTermGetter = state => state.news.searchTerm;
const newsGetter = state => state.news.entities;

export const filteredNewsSelector = createSelector(
  newsGetter,
  searchTermGetter,
  (news, searchTerm) => {
    return mapToArr(news).filter(item => {
      return `${item.title} ${item.content}`.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0;
    });
  }
);
