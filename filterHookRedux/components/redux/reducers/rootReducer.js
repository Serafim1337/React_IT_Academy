import { combineReducers } from "redux";

import vocabularyReducer from "./vocabularyReducer";

const rootReducer = combineReducers({
  vocabulary: vocabularyReducer,
});

export default rootReducer;
