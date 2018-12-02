import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer, { moduleName as authModule } from "../ducks/auth";
import booksReducer, { moduleName as booksModule } from "../ducks/books";
import newsReducer, { moduleName as newsModule } from "../ducks/news";
import editReducer, { moduleName as editModule } from "../ducks/edit";

export default history =>
  combineReducers({
    router: connectRouter(history),
    [authModule]: authReducer,
    [booksModule]: booksReducer,
    [newsModule]: newsReducer,
    [editModule]: editReducer,
  });
