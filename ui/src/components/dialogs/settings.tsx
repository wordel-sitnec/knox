// @ts-nocheck
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

export const Settings = (props) => {
  const { open, setOpen } = props;

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className="fixed inset-0 flex flex-col items-center justify-center h-screen">
        <div className="border border-black border-t-4 bg-white rounded-md w-[95%] sm:w-[450px] h-[35%] flex justify-center items-center shadow-lg pb-10">
          <Dialog.Title className="text-xl">Title of dialog</Dialog.Title>
          <Dialog.Description className="text-white">
            Settings here
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
