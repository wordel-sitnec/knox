import React, { useEffect, useContext } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { UrbitContext } from "./store/contexts/urbitContext";
import { SettingsContext } from "./store/contexts/settingsContext";
import settingsActions from "./store/actions/settingsActions";

import { WelcomeDialog } from "./components/dialogs/welcomeDialog";
import { Login } from "./components/dialogs/login";
import { Vault } from "./components/vault";

export function App() {
  const navigate = useNavigate();

  const [urbitApi] = useContext(UrbitContext);
  const [settingsState, settingsDispatch] = useContext(SettingsContext);
  const { setSettings } = settingsActions;

  const getSettings = () => {
    urbitApi
      .scry({
        app: "knox",
        path: "/settings",
      })
      .then((res) => handleSettings(res.settings))
      // TODO: handle this error?
      .catch((err) => console.log("err", err));
  };

  const handleSettings = (settings) => {
    const showWelcome = settings.find((set) => {
      return Object.keys(set).includes("showWelcome");
    });
    settingsDispatch(setSettings(settings));
    if (showWelcome.showWelcome === "true") navigate("/apps/knox/welcome");
  };

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
    if (upd.init) {
      if (!upd.init.settings.length) getSettings();
      console.log("init", upd);
      const showWelcome = upd.init.settings.find((set) => {
        return Object.keys(set).includes("showWelcome");
      });
      if (showWelcome && showWelcome.showWelcome === "true")
        navigate("/apps/knox/welcome");
      // TODO: handle other events here?
    }
  };

  return (
    <main className="flex justify-center h-screen">
      <Routes>
        <Route
          path="/apps/knox/welcome"
          exact={true}
          element={<WelcomeDialog />}
        />
        <Route path="/apps/knox/login" exact={true} element={<Login />} />
        <Route path={"/apps/knox/"} exact={true} element={<Vault />} />
      </Routes>
    </main>
  );
}
