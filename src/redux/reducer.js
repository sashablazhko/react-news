import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer, { moduleName as authModule } from "../ducks/auth";
import newsReducer, { moduleName as newsModule } from "../ducks/news";

export default history =>
  combineReducers({
    router: connectRouter(history),
    [authModule]: authReducer,
    [newsModule]: newsReducer,
  });
