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
  const [, settingsDispatch] = useContext(SettingsContext);
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
    if (upd.enty) console.log("enty", upd);
    if (upd.init) {
      console.log("init", upd);
      // read settings and redirect to welcome if necessary
      const setsObj = upd.init.settings.find((set) =>
        Object.keys(set).includes("showWelcome")
      );
      const settings = upd.init.settings;
      settingsDispatch(setSettings(settings));
      // TODO: need to add this to default state in agent.. how
      if (setsObj?.showWelcome === "true") navigate("/apps/knox/welcome");
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
