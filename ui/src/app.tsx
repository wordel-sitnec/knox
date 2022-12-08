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
    // TODO: finish this init and redirect
    // get init from knox
    // const init = async () => {
    //   urbitApi.subscribe({ app: "knox", path: "/vault", event: handleUpdate });
    // };
    // init();
    // if init doesn't contain beenWelcomed === true, send to welcome
    // commented out for dev
    // navigate("/apps/knox/welcome");
  }, []);

  // this works, but annoying for dev. turn on for later testing and for prod
  useEffect(() => {
    if (!window.sessionStorage.getItem("secret") && !path.includes("welcome"))
      navigate("/apps/knox/login");
  }, [path]);

  const handleUpdate = (upd) => {
    // set to entries context
    if ("init" in upd) {
      console.log("init");
      setVals(upd.init);
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
