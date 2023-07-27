import React from "react";
import ReactDOM from "react-dom";

import './style.css';

import RainbowFrame from "./components/RainbowFrame/RainbowFrame";

let colors = ['red', 'orange', 'yellow', 'green', '#00BFFF', 'blue', 'purple'];

ReactDOM.render(
  <RainbowFrame colorsList={colors}>Hello !</RainbowFrame>,
  document.querySelector('#container')
);