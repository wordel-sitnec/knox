// @ts-nocheck
import React, { useEffect, useContext } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { UrbitContext } from "./store/contexts/urbitContext";

// components
import { Vault } from "./components/vault";
import { WelcomeDialog } from "./components/dialogs/welcomeDialog";
import { Login } from "./components/dialogs/login";

export function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const [urbitApi] = useContext(UrbitContext);

  useEffect(() => {
    urbitApi.subscribe({
      app: "knox",
      path: "/updates",
      event: handleEvent
    })
    // use this to set an error?
    .catch((err) => console.log('err', err));
  }, [])

  // this works, but annoying for dev. turn on for later testing and for prod
  useEffect(() => {
    if (!window.sessionStorage.getItem("secret") && !path.includes("welcome"))
      navigate("/apps/knox/login");
  }, [path]);

  const handleEvent = (upd) => {
    // set to entries context
    console.log('upd', upd)
    if (upd.init) {
      // const 
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
