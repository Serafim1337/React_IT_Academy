import { createStore, compose, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import rootReducer from "./reducers/rootReducer";

const composedEnhancer = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

const store = createStore(rootReducer, composedEnhancer);

export default store;
