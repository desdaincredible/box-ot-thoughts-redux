import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";


const store = createStore(rootReducer, storeEnhancers(applyMiddleware(thunk)));


export default store;