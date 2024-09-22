import { combineReducers } from "redux";
import accountReducer from "./account";
import stakeReducer from "./stake";
import inoReducer from "./ino";
import multicall from "../state/multicall/reducer";
import uiReducers from "./uiReducers";

export default combineReducers({
  account: accountReducer,
  stake: stakeReducer,
  ino: inoReducer,
  multicall: multicall,
  ui: uiReducers,
});
