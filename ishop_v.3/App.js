import React from "react";
import ReactDOM from "react-dom";

import CatalogBlock from "./components/CatalogBlock/CatalogBlock";

import './style.css';

import dataList from './dataList.json';

ReactDOM.render(
  React.createElement(CatalogBlock, { listOfGoods: dataList.listOfGoods, shopName: dataList.shopName }),
  document.querySelector("#container")
);