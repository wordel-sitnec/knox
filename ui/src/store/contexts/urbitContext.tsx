// @ts-nocheck
import React, { createContext, useState } from "react";
import Urbit from "@urbit/http-api";

export const UrbitContext = createContext({});
const { Provider } = UrbitContext;

export const UrbitProvider = ({ children }) => {
  const [state] = useState(() => {
    let urbitApi = new Urbit("", "", window.desk);
    urbitApi.ship = window.ship;
    return urbitApi;
  });

  return <Provider value={[state, () => {}]}>{children}</Provider>;
};

export default UrbitContext;
