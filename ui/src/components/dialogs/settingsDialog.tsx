// @ts-nocheck
import React, { useContext, useState } from "react";
import { Dialog } from "@headlessui/react";

import { DialogContext } from "../../store/contexts/dialogContext";
import dialogActions from "../../store/actions/dialogActions";

export const SettingsDialog = () => {
  const [dialogState, dialogDispatch] = useContext(DialogContext);
  const { closeSettingsDialog } = dialogActions;

  return (
    <Dialog
      open={dialogState.settingsOpen}
      onClose={() => dialogDispatch(closeSettingsDialog())}
    >
      <div className="fixed inset-0 flex flex-col items-center justify-center h-screen">
        <div className="border border-black border-t-4 bg-white rounded-md w-[95%] sm:w-[450px] sm:h-screen60 sm:max-h-[420px] shadow-lg pb-14">
          <div className="flex flex-col items-center h-[100%] pt-1">
            <button
              onClick={() => dialogDispatch(closeSettingsDialog())}
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
              onClick={() => dialogDispatch(closeSettingsDialog())}
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
