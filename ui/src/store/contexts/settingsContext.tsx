// @ts-nocheck
import React, { createContext, useReducer } from "react";
import { dialogReducer } from "../reducers/dialogReducer";

export const SettingsContext = createContext({});
const { Provider } = SettingsContext;

export const defaultState = {
  settingsOpen: false,
  showWelcome: true,
};

export const SettingsProvider = ({ children }) => {
  const [state, reducer] = useReducer(dialogReducer, defaultState);

  return <Provider value={[state, reducer]}>{children}</Provider>;
};

export default SettingsContext;
