// @ts-nocheck
import React from "react";
import { ComposeComponents as AppProviders } from "./utils";

import { UrbitProvider } from "./store/contexts/urbitContext.tsx";
import { DialogProvider } from "./store/contexts/dialogContext";
import { SettingsProvider } from "./store/contexts/settingsContext";
import { VaultProvider } from "./store/contexts/vaultContext";

const Providers = ({ children }) => {
  const appProviders = [
    UrbitProvider,
    DialogProvider,
    SettingsProvider,
    VaultProvider,
  ];

  return <AppProviders components={appProviders}>{children}</AppProviders>;
};

export default Providers;
