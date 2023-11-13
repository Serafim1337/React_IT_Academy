import React, { Fragment, useState, useCallback } from "react";

import "./Filter.css";

import FilterControls from "../FilterControls/FilterControls";
import FilterDisplay from "../FilterDisplay/FilterDisplay";

const Filter = (props) => {
  const [vocabulary, setVocabulary] = useState(props.dataList);
  const [searchValue, setSearchValue] = useState(null);
  const [isSortEnabled, setSort] = useState(false);

  const cbSortChecked = useCallback((checkboxValue) => setSort(checkboxValue));

  const cbSearchInput = useCallback((searchInput) =>
    setSearchValue(searchInput)
  );

  const cbClearHandler = useCallback(() => setSearchValue(null));

  return (
    <div className="Filter">
      <FilterControls
        cbSortCheck={cbSortChecked}
        cbSearchInput={cbSearchInput}
        cbClearHandler={cbClearHandler}
      ></FilterControls>
      <FilterDisplay
        vocabulary={vocabulary}
        searchValue={searchValue}
        isSortEnabled={isSortEnabled}
      ></FilterDisplay>
    </div>
  );
};

export default Filter;
