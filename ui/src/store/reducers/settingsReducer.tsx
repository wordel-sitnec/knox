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
    case actionTypes.SET_SETTINGS: {
      // TODO: finish this setting to entries business
      const showWelcome = action.settings.find((set) => {
        return set.showWelcome ? Object.values(set.showWelcome) : null;
      });
      return state;
    }
  }
};
