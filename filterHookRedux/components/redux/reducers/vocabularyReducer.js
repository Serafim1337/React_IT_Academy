import dataList from "../../../dataList.json";

const initState = dataList.vocabulary;

const vocabularyReducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default vocabularyReducer;
