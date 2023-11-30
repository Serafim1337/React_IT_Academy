import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/:filter?" element={<App></App>} />
        </Routes>
      </Router>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
