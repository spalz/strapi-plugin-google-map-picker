import produce from "immer";

import { RESOLVE_CONFIG } from "../constants";

const initialState = {
  isLoading: true,
  config: {
    apiKey: null,
    default_center: {},
    favorites_places: [],
  },
};

const configReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case RESOLVE_CONFIG: {
      state.isLoading = false;
      state.config = action.data;
      break;
    }

    default:
      return state;
  }

  return state;
});

export default configReducer;
