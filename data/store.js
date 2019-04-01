import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import initialState from "./initialState";
import reducer from "./reducers";

const reduxDevTools = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__) || compose;
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer, initialState, reduxDevTools());

export default store;
