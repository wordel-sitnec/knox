// @ts-nocheck
import React from "react";
import { ComposeComponents as AppProviders } from "./utils";

import { UrbitProvider } from "./store/contexts/urbitContext.tsx";

const Providers = ({ children }) => {
  const appProviders = [UrbitProvider];

  return <AppProviders components={appProviders}>{children}</AppProviders>;
};

export default Providers;
