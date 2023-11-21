import React, { Fragment } from "react";

import MobileControls from "../components/MobileControls/MobileControls";
import { Outlet } from "react-router-dom";

const MobilePage = () => {
  return (
    <Fragment>
      <MobileControls></MobileControls>
      <hr></hr>
      <Outlet></Outlet>
    </Fragment>
  );
};

export default MobilePage;
