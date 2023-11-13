import React from "react";
import ReactDOM from "react-dom";

import Filter from "./components/Filter/Filter";

import "./style.css";

import dataList from "./dataList.json";

ReactDOM.render(
  <Filter dataList={dataList.vocabulary}></Filter>,
  document.querySelector("#container")
);
