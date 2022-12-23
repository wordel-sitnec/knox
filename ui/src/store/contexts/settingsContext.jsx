import React, { createContext, useReducer } from "react";
import { settingsReducer } from "../reducers/settingsReducer";

export const SettingsContext = createContext({});
const { Provider } = SettingsContext;

export const defaultState = {
  settingsOpen: false,
};

export const SettingsProvider = ({ children }) => {
  const [state, reducer] = useReducer(settingsReducer, defaultState);

  return <Provider value={[state, reducer]}>{children}</Provider>;
};

export default SettingsContext;
