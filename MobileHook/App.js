import React from "react";
import ReactDOM from "react-dom";

import MobileBlock from "./components/MobileBlock/MobileBlock";

import "./style.css";

import dataList from "./dataList.json";

ReactDOM.render(
  <MobileBlock clientsList={dataList.clientsList}></MobileBlock>,
  document.querySelector("#container")
);
