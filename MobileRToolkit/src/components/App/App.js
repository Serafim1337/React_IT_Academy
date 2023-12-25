import React from "react";
import { Provider } from "react-redux";

import store from "../../redux/store";

import MobileBlock from "../MobileBlock/MobileBlock";
import "./App.scss";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <MobileBlock />
      </div>
    </Provider>
  );
};

export default App;
