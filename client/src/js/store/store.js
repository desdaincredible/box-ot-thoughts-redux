import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/reducers";
import thunk from "redux-thunk";
import { getStateMiddleware } from "../middleware/middleware";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, storeEnhancers(applyMiddleware(thunk, getStateMiddleware)));

export default store;