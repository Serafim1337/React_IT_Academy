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
          navigation("/", { replace: false });
        }}
      >
        Все
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => {
          navigation("/active", { replace: false });
        }}
      >
        Активные
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => {
          navigation("/blocked", { replace: false });
        }}
      >
        Заблокированные
      </button>
    </div>
  );
};

export default MobileControls;
