import React from "react";

import "./FilterDisplay.css";

const FilterDisplay = (props) => {
  const wordsList = props.vocabulary.slice();

  const wordsSearched = wordsList.filter((item) =>
    props.searchValue ? item.includes(props.searchValue) : item
  );

  if (props.isSortEnabled) {
    wordsSearched.sort();
  }

  const wordsToShow = wordsSearched.map((item, index) => (
    <p key={index}>{item}</p>
  ));
  return <div className="FilterDisplay">{wordsToShow}</div>;
};

export default FilterDisplay;
