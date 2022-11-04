// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Urbit from "@urbit/http-api";
import { Charges, ChargeUpdateInitial, scryCharges } from "@urbit/api";

// components
import { Vault } from "./components/vault";
import { WelcomeDialog } from "./components/dialogs/welcomeDialog";

const api = new Urbit("", "", window.desk);
api.ship = window.ship;

export function App() {
  const [vals, setVals] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // get init from knox
    const init = async () => {
      api.subscribe({ app: "knox", path: "/vault", event: handleUpdate });
    };
    init();
    // if init doesn't contain beenWelcomed === true, send to welcome
    navigate("/apps/knox/welcome");
  }, []);

  const handleUpdate = (upd) => {
    if ("init" in upd) {
      console.log("init");
      setVals(upd.init);
    }
  };

  return (
    <main className="flex justify-center min-h-screen sm:py-5">
      <Routes>
        <Route
          // this was for reload problem, investigate
          path={`/apps/knox` || `/apps/knox/`}
          exact={true}
          element={<Vault />}
        />
        <Route
          path="/apps/knox/welcome"
          exact={true}
          element={<WelcomeDialog />}
        />
      </Routes>
    </main>
  );
}
