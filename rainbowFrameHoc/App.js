import React from "react";
import ReactDOM from "react-dom";

import './style.css';

import DoubleButton from "./components/DoubleButton/DoubleButton";
import withRainbowFrame from './components/withRainbowFrame'

let colors = ['red', 'orange', 'yellow', 'green', '#00BFFF', 'blue', 'purple'];

let DoubleButtonRainbow = withRainbowFrame(colors)(DoubleButton);

ReactDOM.render(
  <DoubleButtonRainbow caption1="однажды" caption2="пору" cbPressed={num => alert(num)}>
    в студёную зимнюю
  </DoubleButtonRainbow>,
  document.querySelector('#container')
);