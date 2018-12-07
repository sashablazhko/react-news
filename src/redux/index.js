import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import history from "../history";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducer";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(routerMiddleware(history), sagaMiddleware, thunk, logger);

const store = createStore(reducer(history), enhancer);
window.store = store;

sagaMiddleware.run(rootSaga);

export default store;
