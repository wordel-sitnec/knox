// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Urbit from "@urbit/http-api";
import { Charges, ChargeUpdateInitial, scryCharges } from "@urbit/api";

// components
import { Vault } from "./components/vault";
import { WelcomeDialog } from "./components/dialogs/welcomeDialog";
import { Login } from "./components/dialogs/login";

const api = new Urbit("", "", window.desk);
api.ship = window.ship;

export function App() {
  const [vals, setVals] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    // get init from knox
    const init = async () => {
      api.subscribe({ app: "knox", path: "/vault", event: handleUpdate });
    };
    init();
    // if init doesn't contain beenWelcomed === true, send to welcome
    // this is for dev
    if (!window.localStorage.getItem("skipWelcome"))
      navigate("/apps/knox/welcome");
  }, []);

  // this works, but annoying for dev. turn on for later testing and for prod
  useEffect(() => {
    if (!window.sessionStorage.getItem("secret") && !path.includes("welcome"))
      navigate("/apps/knox/login");
  }, [path]);

  const handleUpdate = (upd) => {
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
