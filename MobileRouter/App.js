import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MobilePage from "./pages/MobilePage";
import MobileBlock from "./components/MobileBlock/MobileBlock";
import MobileControls from "./components/MobileControls/MobileControls";

import "./style.css";

import dataList from "./dataList.json";

ReactDOM.render(
  <BrowserRouter>
    {/* <MobileControls></MobileControls> */}
    <Routes>
      <Route path="/" element={<MobilePage></MobilePage>}>
        <Route
          index
          element={
            <MobileBlock clientsList={dataList.clientsList}></MobileBlock>
          }
        ></Route>
        <Route
          path="active"
          element={
            <MobileBlock clientsList={dataList.clientsList}></MobileBlock>
          }
        ></Route>

        <Route
          path="blocked"
          element={
            <MobileBlock clientsList={dataList.clientsList}></MobileBlock>
          }
        ></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.querySelector("#container")
);
