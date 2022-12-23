import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UrbitContext } from "../../store/contexts/urbitContext";
import { VaultContext } from "../../store/contexts/vaultContext";
import { DialogContext } from "../../store/contexts/dialogContext";
import { SettingsContext } from "../../store/contexts/settingsContext";
import dialogActions from "../../store/actions/dialogActions";
import settingsActions from "../../store/actions/settingsActions";
import vaultActions from "../../store/actions/vaultActions";
import { generatePassword, getSecret } from "../../utils";

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

  const [urbitApi] = useContext(UrbitContext);
  const [vaultState, vaultDispatch] = useContext(VaultContext);
  const [dialogState, dialogDispatch] = useContext(DialogContext);
  const [settingsState, settingsDispatch] = useContext(SettingsContext);
  const { openAddDialog } = dialogActions;
  const { openSettings } = settingsActions;
  const { setVault } = vaultActions;

  const navigate = useNavigate();

  useEffect(() => {
    if (!getSecret()) navigate("/apps/knox/login");
  }, []);

  useEffect(() => {
    urbitApi
      .scry({
        app: "knox",
        path: "/vault",
      })
      .then((res) => vaultDispatch(setVault(res.vault)))
      // TODO: use this to set an error?
      .catch((err) => console.log("err", err));
  }, []);

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

    const handleScry = () => {
      urbitApi
        .scry({
          app: "knox",
          path: "/enty",
        })
        .then((res) => {
          setGenerated(generatePassword(res.enty));
        })
        // TODO: handle this error?
        .catch((err) => console.log("err", err));
    };

    urbitApi
      .poke({
        app: "knox",
        mark: "knox-action",
        json: {
          gen: { enty: parseInt(1) },
        },
      })
      .then(handleScry())
      // TODO: handle this error
      .catch((err) => console.log("err", err));

    // setGenerated(generatePassword());
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
      <AddDialog password={showGenerated ? generated : null} />
      <EditDialog />
      <DeleteDialog />
      <Settings />

      {/*
       * TODO: should refactor the small screen view so so much space
       * isn't taken up by action buttons, search, etc
       */}
      <div
        className={`flex flex-col min-w-[60%] lg:max-w-[60%] xl:max-w-[40%] mt-2 sm:mt-8 mx-2 ${
          dialogState.addOpen ||
          dialogState.deleteOpen ||
          dialogState.editOpen ||
          settingsState.settingsOpen
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
                {/* TODO: have a save password flow, but could be improved */}
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
            <button className="text-xl font-bold px-2" onClick={handleDice}>
              <ion-icon name="dice-outline" />
            </button>
            <button
              className={`text-xl font-bold px-2 hover:scale-120 my-1 ${
                !vaultState.length &
                !(
                  dialogState.addOpen ||
                  dialogState.deleteOpen ||
                  dialogState.editOpen ||
                  settingsState.settingsOpen
                )
                  ? "animate-bounce"
                  : ""
              }`}
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
            <span className="hidden md:inline ml-1">- your password vault</span>
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
        <div className="overflow-x-auto bg-white border h-screen70 2xl:h-screen60 border-black shadow-lg sm:rounded-b-lg sm:p-0">
          <table
            className={`w-full text-gray-400 table-fixed w-full ${
              !vaultState.length ? "h-full" : ""
            }`}
          >
            {!vaultState.length ? (
              <thead className="w-full h-full text-center sm:text-2xl md:text-3xl text-xl align-middle">
                <tr>
                  <td className="px-2 pt-20 sm:pt-0">
                    Get started by clicking the{" "}
                    <span className="inline-flex align-bottom pb-1">
                      <ion-icon name="add" />
                    </span>{" "}
                    button above <br />
                    <br />
                    Click on the{" "}
                    <span className="inline-flex align-bottom pb-1">
                      <ion-icon name="dice-outline" />
                    </span>{" "}
                    button to generate a password
                  </td>
                </tr>
              </thead>
            ) : (
              <>
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
              </>
            )}
          </table>
        </div>
      </div>
    </>
  );
}
