// @ts-nocheck
import React, { useContext, useState } from "react";
import { Dialog } from "@headlessui/react";

import { SettingsContext } from "../../store/contexts/settingsContext";
import settingsActions from "../../store/actions/settingsActions";

export const Settings = () => {
  const [settingsState, settingsDispatch] = useContext(SettingsContext);
  const { closeSettings } = settingsActions;

  console.log("state", settingsState)

  return (
    <Dialog
      open={true}
      onClose={() => settingsDispatch(closeSettings())}
    >
      <div className="fixed inset-0 flex flex-col items-center justify-center h-screen">
        <div className="border border-black border-t-4 bg-white rounded-md w-[95%] sm:w-[450px] sm:h-screen60 sm:max-h-[420px] shadow-lg pb-14">
          <div className="flex flex-col items-center h-[100%] pt-1">
            <button
              onClick={() => settingsDispatch(closeSettings())}
              className="p-1 mr-2 self-end"
            >
              {/* get color right */}
              <ion-icon name="close" />
            </button>
            <Dialog.Title className="text-xl">Knox settings</Dialog.Title>

            <div className="my-12">
              <h3>Settings here</h3>
              <h3>Settings here</h3>
            </div>

            <button
              onClick={() => console.log("save")}
              className="mt-1 w-[75%] border border-black p-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => settingsDispatch(closeSettings())}
              className="mt-1 mb-6 w-[75%] border border-black p-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
