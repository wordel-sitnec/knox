// @ts-nocheck
import { actionTypes } from "../actions/dialogActions";

export const dialogReducer = (state, action) => {
  if (!action || !action.type) return state;

  switch (action.type) {
    case actionTypes.OPEN_DELETE: {
      return {
        ...state,
        deleteOpen: true,
        deleteId: action.id,
      };
    }
    case actionTypes.CLOSE_DELETE: {
      return {
        ...state,
        deleteOpen: false,
        deleteId: "",
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
    case actionTypes.OPEN_EDIT: {
      return {
        ...state,
        editOpen: true,
        editWebsite: action.website,
        editUsername: action.username,
        editPassword: action.password,
        editId: action.id,
      };
    }
    case actionTypes.CLOSE_EDIT: {
      return {
        ...state,
        editOpen: false,
        editWebsite: "",
        editUsername: "",
        editPassword: "",
        editId: "",
      };
    }
  }
};
