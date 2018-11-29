import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as form } from "redux-form";
import authReducer, { moduleName as authModule } from "../ducks/auth";
import booksReducer, { moduleName as booksModule } from "../ducks/books";
import newsReducer, { moduleName as newsModule } from "../ducks/news";

export default history =>
  combineReducers({
    router: connectRouter(history),
    form,
    [authModule]: authReducer,
    [booksModule]: booksReducer,
    [newsModule]: newsReducer,
  });
// export default (history) => combineReducers({
//   router: connectRouter(history),
//   ... // rest of your reducers
// })
