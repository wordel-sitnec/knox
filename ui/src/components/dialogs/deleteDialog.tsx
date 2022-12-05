// @ts-nocheck
import React, { useState, useContext, useEffect } from "react";
import { Dialog } from "@headlessui/react";

import { UrbitContext } from "../../store/contexts/urbitContext";
import { DialogContext } from "../../store/contexts/dialogContext";
import dialogActions from "../../store/actions/dialogActions";

export const DeleteDialog = () => {
  const [dialogState, dialogDispatch] = useContext(DialogContext);
  const { closeDeleteDialog } = dialogActions;

  const handleDelete = () => {
    setLoading(true);
    urbitApi
      .poke({
        app: "knox",
        mark: "knox-action",
        json: {
          del: {
            id: "hi",
          },
        },
      })
      .then((res) => handleSuccess(res))
      .catch((err) => handleError(err));
  };

  return (
    <Dialog
      open={dialogState.deleteOpen}
      onClose={() => dialogDispatch(closeDeleteDialog())}
    >
      <div className="fixed inset-0 flex flex-col items-center justify-center h-screen">
        <div className="border border-black border-t-4 bg-white rounded-md w-[95%] sm:w-[450px] sm:h-screen60 sm:max-h-[420px] shadow-lg pb-14">
          <div className="flex flex-col items-center h-[100%] pt-1">
            <button
              onClick={() => dialogDispatch(closeDeleteDialog())}
              className="p-1 mr-2 self-end"
            >
              {/* get color right */}
              <ion-icon name="close" />
            </button>

            <Dialog.Title className="text-xl mb-6">
              Are you sure you want to delete?
            </Dialog.Title>

            <button
              // onClick={() => setError(!error)}
              className="mt-1 mb-6 w-[75%] border border-black p-1 rounded"
            >
              Generate
            </button>
            <p>don't show this warning again</p>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
