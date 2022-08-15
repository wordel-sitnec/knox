// @ts-nocheck
import React, { useEffect, useState } from "react";
import Urbit from "@urbit/http-api";
import { Charges, ChargeUpdateInitial, scryCharges } from "@urbit/api";

// components
import { Vault } from "./components/vault";
import { DeleteDialog } from "./components/deleteDialog";

const api = new Urbit("", "", window.desk);
api.ship = window.ship;

export function App() {
  const [vals, setVals] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    async function init() {
      api.subscribe({ app: "knox", path: "/vault", event: handleUpdate });
    }

    init();
  }, []);

  const handleUpdate = (upd) => {
    if ("init" in upd) {
      console.log("init");
      setVals(upd.init);
    }
  };

  return (
    <main className="flex justify-center min-h-screen sm:py-5">
      <Vault />
    </main>
  );
}
