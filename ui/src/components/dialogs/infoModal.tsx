// @ts-nocheck
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

export const InfoModal = (props) => {
  const { open, setOpen } = props;

  return (
    <Dialog className="opacity-50" open={open} onClose={() => setOpen(false)}>
      <div className="flex items-center bg-neutral-700 justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-neutral-700 border min-h-50" />
        <div className="relative border bg-black rounded max-w-sm mx-auto p-8">
          <Dialog.Title className="text-xl">Title of dialog</Dialog.Title>
          <Dialog.Description>
            Description of dialog contents.
          </Dialog.Description>
          <button
            className="border-black border-solid border rounded mx-2 mt-8 py-1 px-2"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="border-black border-solid border rounded mx-2 mt-8 py-1 px-2"
            onClick={() => setOpen(false)}
          >
            Confirm
          </button>
        </div>
      </div>
    </Dialog>
  );
};
