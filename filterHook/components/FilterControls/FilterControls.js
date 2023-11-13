import React, { useRef } from "react";

import "./FilterControls.css";

const FilterControls = (props) => {
  const inputRef = useRef(null);
  const checkboxRef = useRef(null);

  function sortChecked(e) {
    props.cbSortCheck(e.target.checked);
  }

  function searchInput(e) {
    props.cbSearchInput(e.target.value);
  }

  function clearHandler() {
    inputRef.current.value = "";
    checkboxRef.current.checked = false;
    props.cbClearHandler();
  }

  return (
    <div className="FilterControls form-check form-switch">
      <input
        type="checkbox"
        onChange={sortChecked}
        ref={checkboxRef}
        className="form-check-input sort-checkbox"
      ></input>
      <input
        type="text"
        onChange={searchInput}
        ref={inputRef}
        className="form-control"
      ></input>
      <button onClick={clearHandler} className="btn btn-light">
        Clear
      </button>
    </div>
  );
};

export default FilterControls;
