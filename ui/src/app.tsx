// @ts-nocheck
import React, { useEffect, useContext } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { UrbitContext } from "./store/contexts/urbitContext";
import { SettingsContext } from "./store/contexts/settingsContext";
import settingsActions from "./store/actions/settingsActions";
import { VaultContext } from "./store/contexts/vaultContext";
import vaultActions from "./store/actions/vaultActions";
import { getSecret } from "./utils";

// components
import { Vault } from "./components/vault";
import { WelcomeDialog } from "./components/dialogs/welcomeDialog";
import { Login } from "./components/dialogs/login";

export function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const [urbitApi] = useContext(UrbitContext);
  const [settingsState, settingsDispatch] = useContext(SettingsContext);
  const { setSettings } = settingsActions;

  useEffect(() => {
    urbitApi
      .subscribe({
        app: "knox",
        path: "/updates",
        event: handleEvent,
      })
      // TODO: use this to set an error?
      .catch((err) => console.log("err", err));
  }, []);

  const handleEvent = (upd) => {
    // TODO: set to entries context
    console.log("init", upd);
    if (upd.init) {
      const settings = upd.init.settings;
      settingsDispatch(setSettings(settings));
    }
  };

  useEffect(() => {
    if (!getSecret() && !path.includes("welcome")) navigate("/apps/knox/login");
    if (settingsState.showWelcome && !path.includes("welcome"))
      navigate("/apps/knox/welcome");
  }, [path, settingsState]);

  return (
    <main className="flex justify-center h-screen">
      <Routes>
        <Route
          path="/apps/knox/welcome"
          exact={true}
          element={<WelcomeDialog />}
        />
        <Route path="/apps/knox/login" exact={true} element={<Login />} />
        <Route
          // this was for reload problem, investigate
          path={`/apps/knox` || `/apps/knox/`}
          exact={true}
          element={<Vault />}
        />
      </Routes>
    </main>
  );
}
