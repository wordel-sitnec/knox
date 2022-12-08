// @ts-nocheck
import React, { useContext, useState } from "react";

import { VaultTableBody } from "./vaultTableBody";

import { InfoDialog } from "../dialogs/infoDialog";
import { Settings } from "../dialogs/settings";
import { AddDialog } from "../dialogs/addDialog";
import { DeleteDialog } from "../dialogs/deleteDialog";
import { EditDialog } from "../dialogs/editDialog";

import { UrbitContext } from "../../store/contexts/urbitContext";
import { DialogContext } from "../../store/contexts/dialogContext";
import dialogActions from "../../store/actions/dialogActions";

// mocks
import * as passwords from "../../mocks/passwords.json";

export function Vault() {
  const { data } = passwords;
  console.log("data", data);

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const [dialogState, dialogDispatch] = useContext(DialogContext);
  const { openAddDialog } = dialogActions;

  const [showInfo, setShowInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [showGenerated, setShowGenerated] = useState(false);
  // this state will need to change, this was for testing ^^

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
      <InfoDialog open={showInfo} setOpen={setShowInfo} />
      <Settings open={showSettings} setOpen={setShowSettings} />
      <AddDialog password={showGenerated ? "password" : null} />
      <EditDialog />
      <DeleteDialog />

      {/*
       * TODO: should refactor the small screen view so so much space
       * isn't taken up by action buttons, search, etc
       */}
      <div
        className={`flex flex-col min-w-[60%] xl:max-w-[40%] sm:h-screen80 mt-2 sm:mt-8 mx-2 ${
          dialogState.addOpen ||
          dialogState.deleteOpen ||
          dialogState.editOpen ||
          showSettings ||
          showGenerateDialog
            ? "opacity-50"
            : ""
        }`}
      >
        {/* TODO: generated stuff - will probably change */}
        <div className="flex justify-end px-2 mb-1">
          {showGenerated && (
            <div className="w-[70%] sm:max-w-[50%] flex pr-4 justify-end">
              <button className="border border-black rounded-md shadow py-1 mx-1 px-1 bg-white hover:bg-gray-200 w-[80%] overflow-x-auto">
                passwordpasswordpasswordpasswordpasswordpasswordpassword
              </button>
              {/* TODO: need to have some save the new password flow, what though */}
              <button
                className="text-xl font-bold pl-2"
                onClick={() => dialogDispatch(openAddDialog())}
              >
                <ion-icon name="add" />
              </button>
              <button
                onClick={() => setShowGenerated(false)}
                className="text-xl pl-2"
              >
                <ion-icon name="close" />
              </button>
            </div>
          )}
          {/* action buttons */}
          <div>
            <button
              className="text-xl font-bold px-2"
              onClick={() => setShowGenerated(!showGenerated)}
            >
              <ion-icon name="dice-outline" className="text-xl" />
            </button>
            <button
              className="text-xl font-bold px-2 hover:scale-120 my-1"
              onClick={() => dialogDispatch(openAddDialog())}
            >
              <ion-icon name="add" />
            </button>
            <button
              className="text-xl font-bold px-2 hover:scale-120 my-1"
              onClick={() => setShowSettings(true)}
            >
              <ion-icon name="settings-sharp" id="settings-icon" />
            </button>
          </div>
        </div>
        {/* title and search */}
        <div className="flex p-2 sm:p-4 justify-between border-l border-r border-black border-t-4 bg-white sm:rounded-t-lg">
          <p className="text-xl font-normal text-gray-500 text-gray-400 mt-1 p-0 align-middle flex">
            knox
            <span className="hidden md:inline"> - your password vault</span>
            <button className="px-2" onClick={() => setShowInfo(true)}>
              <ion-icon name="information-circle-outline" />
            </button>
          </p>
          <div className="flex">
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
              />
            </div>
          </div>
        </div>
        {/* beginning of table */}
        <div className="overflow-x-auto bg-white border border-t border-black shadow-lg sm:rounded-b-lg sm:h-screen80">
          <table className="w-full text-gray-400 table-fixed">
            <colgroup>
              <col className="w-[25%]" />
              <col className="w-[30%]" />
              <col className="w-[20%]" />
              <col className="w-[8%]" />
              <col className="w-[12%]" />
            </colgroup>
            <thead className="sticky top-0 bg-white z-10">
              <tr className="text-left bg-gray-200 text-center">
                <th className="">site</th>
                <th className="">username</th>
                <th className="">password</th>
                <th className="">view</th>
                <th className="">edit</th>
              </tr>
            </thead>
            <VaultTableBody searchValue={searchValue} data={data} />
          </table>
        </div>
      </div>
    </>
  );
}
