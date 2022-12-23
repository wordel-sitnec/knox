import React, { useState, useContext, useEffect } from "react";
import { Dialog } from "@headlessui/react";

import { VaultContext } from "../../store/contexts/vaultContext";
import vaultActions from "../../store/actions/vaultActions";
import { UrbitContext } from "../../store/contexts/urbitContext";
import { DialogContext } from "../../store/contexts/dialogContext";
import dialogActions from "../../store/actions/dialogActions";

export const DeleteDialog = () => {
  const [urbitApi] = useContext(UrbitContext);
  const [, vaultDispatch] = useContext(VaultContext);
  const { setVault } = vaultActions;
  const [dialogState, dialogDispatch] = useContext(DialogContext);
  const { closeDeleteDialog } = dialogActions;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // reset component state when modal closes
  useEffect(() => {
    setLoading(false);
    setSuccess(false);
    setError(false);
  }, [dialogState.deleteOpen]);

  const handleDelete = () => {
    setLoading(true);

    urbitApi
      .poke({
        app: "knox",
        mark: "knox-action",
        json: {
          del: {
            id: parseInt(dialogState.deleteId),
          },
        },
      })
      .then(() => handleSuccess())
      .catch((err) => handleError(err));
  };

  const handleSuccess = () => {
    setLoading(false);
    setSuccess(true);
    handleScry();
  };

  const handleError = (err) => {
    setLoading(false);
    setError(true);
  };

  const handleScry = () => {
    urbitApi
      .scry({
        app: "knox",
        path: "/vault",
      })
      .then((res) => vaultDispatch(setVault(res.vault)))
      // TODO: handle this error?
      .catch((err) => console.log("err", err));
  };

  return (
    <Dialog
      open={dialogState.deleteOpen}
      onClose={() => dialogDispatch(closeDeleteDialog())}
    >
      <div className="fixed inset-0 flex flex-col items-center justify-center h-screen">
        <div className="border border-black border-t-4 bg-white rounded-md w-[95%] sm:w-[450px] shadow-lg pb-14">
          <div className="flex flex-col items-center h-[100%] pt-1">
            <button
              onClick={() => dialogDispatch(closeDeleteDialog())}
              className="p-1 mr-2 self-end"
            >
              {/* TODO: get color right */}
              <ion-icon name="close" />
            </button>
            <Dialog.Title className="text-xl mb-6 text-center">
              Are you sure you want to delete? <br />
              This cannot be undone.
            </Dialog.Title>
            {!success ? (
              <button
                onClick={handleDelete}
                disabled={loading}
                className="my-1 w-[75%] border border-black p-1 rounded flex justify-center"
              >
                {!loading ? "Delete" : <div className="animate-spin">~</div>}
              </button>
            ) : (
              <button className="my-1 w-[75%] border border-black p-1 rounded bg-green-400">
                Success
              </button>
            )}
            {error && (
              <button className="my-1 w-3/4 px-2 border border-black p-1 rounded bg-red-400">
                Something went wrong. Try again.
              </button>
            )}
            <div className="mt-3">
              Skip this warning by updating your settings.
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
