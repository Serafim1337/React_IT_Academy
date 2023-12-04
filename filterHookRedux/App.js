import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import Filter from "./components/Filter/Filter";
import rootReducer from "./components/redux/reducers/rootReducer";

import "./style.css";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Filter></Filter>
  </Provider>,
  document.querySelector("#container")
);
