import { GET_SINGLE_POOL, GET_ALL_POOLS } from "../actions/types";

const initalState = {
  pool: null,
  pools: [],
};

export default function INO(state = initalState, action) {
  switch (action.type) {
    case GET_SINGLE_POOL:
      return {
        ...state,
        pool: action.payload,
      };

    case GET_ALL_POOLS:
      console.log(state);
      return {
        ...state,
        pools: [...state.pools, action.payload],
      };

    default:
      return state;
  }
}
