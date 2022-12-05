// @ts-nocheck
import React from "react";
import { ComposeComponents as AppProviders } from "./utils";

import { UrbitProvider } from "./store/contexts/urbitContext.tsx";
import { DialogProvider } from "./store/contexts/dialogContext";

const Providers = ({ children }) => {
  const appProviders = [UrbitProvider, DialogProvider];

  return <AppProviders components={appProviders}>{children}</AppProviders>;
};

export default Providers;
