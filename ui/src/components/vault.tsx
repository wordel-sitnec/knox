// @ts-nocheck
import React, { useState, useEffect } from "react";
import Urbit from "@urbit/http-api";

import { VaultTableBody } from "./vault/vaultTableBody";

import { InfoModal } from "./dialogs/infoModal";
import { Settings } from "./dialogs/settings";
import { AddDialog } from "./dialogs/addDialog";

// mocks
import * as passwords from "../mocks/passwords.json";

const api = new Urbit("", "", window.desk);
api.ship = window.ship;

export function Vault(props) {
  // const { hasAgreed } = props;
  const { data } = passwords;
  console.log("data", data);

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const [showInfo, setShowInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAdd = () => {
    console.log("api.ship", api.ship);
    api.poke({
      app: "knox",
      mark: "knox-action",
      json: { add: { website: "test", username: "test", password: "test" } },
    });
  };

  const handleEdit = () => {
    api.poke({
      app: "knox",
      mark: "knox-action",
      json: {
        edit: {
          id: 1895202297,
          website: "test",
          username: "test",
          password: "newTest",
        },
      },
    });
  };

  const handleDel = () => {
    api.poke({
      app: "knox",
      mark: "knox-action",
      json: {
        del: {
          id: 1895202297,
        },
      },
    });
  };

  return (
    <>
      {/* set these to one component that switches based on dialog context */}
      <InfoModal open={showInfo} setOpen={setShowInfo} />
      <Settings open={showSettings} setOpen={setShowSettings} />
      <AddDialog open={showAddModal} setOpen={setShowAddModal} />
      <div
        className={`overflow-x-auto bg-white relative shadow-lg sm:rounded-lg min-w-[60%] xl:max-w-[40%] sm:h-screen80 mt-10 ${
          showSettings || showAddModal ? "opacity-50" : ""
        }`}
        // set this div state ternary to dialog context
      >
        <div className="bg-gray-900 flex justify-end">
          <button className="bg-white text-xl font-bold border-black border-2 px-5">
            Generate
          </button>
          <button
            className="bg-white text-xl font-bold border-black border-2 px-5"
            onClick={() => setShowAddModal(!showAddModal)}
          >
            Add
          </button>
          <button className="bg-white text-xl font-bold border-black border-2 px-5">
            Refresh
          </button>
        </div>
        <div className="flex p-4 bg-gray-900 justify-between align-middle">
          <p className="text-xl font-normal text-gray-500 text-gray-400 mt-1 p-0 align-middle">
            knox
            <span className="hidden md:inline"> - your password vault</span>
            <ion-icon
              id="info-icon"
              name="information-circle-outline"
              onClick={() => setShowInfo(!showInfo)}
            ></ion-icon>
          </p>
          <div className="flex">
            <button
              onClick={() => setShowSettings(true)}
              className="text-white"
            >
              <ion-icon name="settings-sharp" id="settings-icon"></ion-icon>
            </button>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="p-2 pl-10 w-32 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500"
                placeholder="search"
                onChange={handleSearch}
                value={searchValue}
              ></input>
            </div>
          </div>
        </div>
        <VaultTableBody searchValue={searchValue} data={data} />
      </div>
    </>
  );
}
