import { UPDATE_MENUTAB_INDEX, GET_ORDER } from "../actions/types";

const initalState = {
  menuTabIndex: 0,
};

export default function UI(state = initalState, action) {
  switch (action.type) {
    case UPDATE_MENUTAB_INDEX:
      return {
        ...state,
        menuTabIndex: action.payload,
      };

    default:
      return state;
  }
}
