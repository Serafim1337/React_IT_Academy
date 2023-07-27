import React from "react";
import ReactDOM from "react-dom";

import './style.css';

import BR2JSX from './components/BR2JSX/BR2JSX';

let text = "первый<br>второй<br/>третий<br />последний";

ReactDOM.render(
  <BR2JSX text={text}></BR2JSX>,
  document.querySelector('#container')
);