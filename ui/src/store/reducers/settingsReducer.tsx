// @ts-nocheck
import { actionTypes } from "../actions/settingsActions";

export const settingsReducer = (state, action) => {
  if (!action || !action.type) return state;

  switch (action.type) {
    case actionTypes.OPEN_SETTINGS: {
      return {
        ...state,
        settingsOpen: true,
      };
    }
    case actionTypes.CLOSE_SETTINGS: {
      return {
        ...state,
        settingsOpen: false,
      };
    }
  }
};
