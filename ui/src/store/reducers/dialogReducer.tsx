// @ts-nocheck
import { defaultState } from "../contexts/dialogContext";
import { actionTypes } from "../actions/dialogActions";

const dialogTypes = {
  DELETE: "DELETE",
};

export const dialogReducer = (state, action) => {
  if (!action || !action.type) return state;

  switch (action.type) {
    case actionTypes.OPEN_DELETE: {
      return {
        ...state,
        deleteOpen: true,
      };
    }
    case actionTypes.CLOSE_DELETE: {
      return {
        ...state,
        deleteOpen: false,
      };
    }
    case actionTypes.OPEN_ADD: {
      return {
        ...state,
        addOpen: true,
      };
    }
    case actionTypes.CLOSE_ADD: {
      return {
        ...state,
        addOpen: false,
      };
    }
  }
};
