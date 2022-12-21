// @ts-nocheck
import React, { createContext, useReducer } from "react";
import { vaultReducer } from "../reducers/vaultReducer";

export const VaultContext = createContext({});
const { Provider } = VaultContext;

export const defaultState = [];

export const VaultProvider = ({ children }) => {
  const [state, reducer] = useReducer(vaultReducer, defaultState);

  return <Provider value={[state, reducer]}>{children}</Provider>;
};

export default VaultContext;
