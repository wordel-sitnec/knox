// @ts-nocheck
import React, { useContext, useState, useEffect } from "react";

import VaultContext from "../../store/contexts/vaultContext";
import { DialogContext } from "../../store/contexts/dialogContext";
import { SettingsContext } from "../../store/contexts/settingsContext";
import dialogActions from "../../store/actions/dialogActions";
import settingsActions from "../../store/actions/settingsActions";
import { generatePassword } from "../../utils";

import { VaultTableBody } from "./vaultTableBody";
import { InfoDialog } from "../dialogs/infoDialog";
import { Settings } from "../dialogs/settings";
import { AddDialog } from "../dialogs/addDialog";
import { DeleteDialog } from "../dialogs/deleteDialog";
import { EditDialog } from "../dialogs/editDialog";

export function Vault() {
  const [searchValue, setSearchValue] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [generated, setGenerated] = useState("");
  const [showGenerated, setShowGenerated] = useState(false);
  const [generatedCopied, setGeneratedCopied] = useState(false);

  const [vaultState] = useContext(VaultContext);
  const [dialogState, dialogDispatch] = useContext(DialogContext);
  const [settingsState, settingsDispatch] = useContext(SettingsContext);
  const { openAddDialog } = dialogActions;
  const { openSettings } = settingsActions;

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleCopy = (e) => {
    if (e.target.value) {
      navigator.clipboard.writeText(e.target.value);
      setGeneratedCopied(true);
    }
  };

  const handleDice = () => {
    if (!showGenerated) setShowGenerated(true);
    setGenerated(generatePassword());
  };

  useEffect(() => {
    if (generatedCopied) {
      setTimeout(() => {
        setGeneratedCopied(false);
      }, "3500");
    }
  }, [generatedCopied]);

  // close generated when opening a dialog, add to if necessary
  useEffect(() => {
    if (
      dialogState.addOpen ||
      dialogState.editOpen ||
      dialogState.deleteOpen ||
      settingsState.settingsOpen
    ) {
      setGenerated("");
      setShowGenerated(false);
    }
  }, [dialogState, settingsState]);

  return (
    <>
      <InfoDialog open={showInfo} setOpen={setShowInfo} />
      <Settings />
      <AddDialog password={showGenerated ? generated : null} />
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
          dialogState.settingsOpen
            ? "opacity-50"
            : ""
        }`}
      >
        {/* TODO: generated stuff - will probably change */}
        <div
          className={`flex pr-2 py-1 mb-1 ${
            showGenerated ? "justify-between" : "justify-end"
          }`}
        >
          {/* TODO: close this when add dialog is entered and then closed */}
          {showGenerated && (
            <div className="w-[70%] sm:max-w-[50%] flex">
              <button
                onClick={handleCopy}
                className="border border-black rounded-md shadow py-1 px-2 bg-white hover:bg-gray-200 w-[80%] overflow-x-auto"
                value={generated}
              >
                {generated}
              </button>
              <div className="flex items-center">
                {generatedCopied && (
                  <ion-icon
                    id="generated-copy-icon"
                    name="copy-outline"
                    className="pl-2"
                  />
                )}
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
            </div>
          )}
          {/* action buttons */}
          <div className="">
            {/* TODO: make this button generate a new password and not close if already open */}
            <button className="text-xl font-bold px-2" onClick={handleDice}>
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
              onClick={() => settingsDispatch(openSettings())}
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
            <VaultTableBody searchValue={searchValue} vault={vaultState} />
          </table>
        </div>
      </div>
    </>
  );
}
