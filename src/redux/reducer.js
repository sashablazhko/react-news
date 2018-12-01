import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as form } from "redux-form";
import { reducer as editForm } from "redux-form";
import authReducer, { moduleName as authModule } from "../ducks/auth";
import booksReducer, { moduleName as booksModule } from "../ducks/books";
import newsReducer, { moduleName as newsModule } from "../ducks/news";
import editReducer, { moduleName as editModule } from "../ducks/edit";

export default history =>
  combineReducers({
    router: connectRouter(history),
    form,
    editForm,
    [authModule]: authReducer,
    [booksModule]: booksReducer,
    [newsModule]: newsReducer,
    [editModule]: editReducer,
  });
