import React, { Fragment } from "react";

import "./MobileControls.css";
import { useNavigate } from "react-router-dom";

const MobileControls = () => {
  const navigation = useNavigate();
  return (
    <div className="MobileControls">
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => {
          navigation("/");
        }}
      >
        Все
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => {
          navigation("active");
        }}
      >
        Активные
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => {
          navigation("blocked");
        }}
      >
        Заблокированные
      </button>
    </div>
  );
};

export default MobileControls;
