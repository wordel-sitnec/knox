// @ts-nocheck
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

export const GenerateDialog = (props) => {
  const { open, setOpen } = props;

  //   might want to keep this for some clever save new entry after generating flow
  const [formState, setFormState] = useState({
    website: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className="fixed inset-0 flex flex-col items-center justify-center h-screen">
        <div className="border border-black border-t-4 bg-white rounded-md w-[95%] sm:w-[450px] shadow-lg pb-14">
          <div className="flex flex-col items-center justify-center h-[100%]">
            <button
              onClick={() => setOpen(false)}
              className="p-1 mr-2 self-end"
            >
              {/* get color right */}
              <ion-icon name="close" />
            </button>

            <Dialog.Title className="text-xl mb-4">
              Generate a password
            </Dialog.Title>
            <input
              className="my-1 w-[75%] border border-black p-1"
              name="website"
              value={formState.website}
              onChange={handleChange}
              placeholder="website"
            />
            <input
              className="my-1 w-[75%] border border-black p-1"
              name="username"
              value={formState.username}
              onChange={handleChange}
              placeholder="username"
            />
            <input
              className="my-1 w-[75%] border border-black p-1"
              name="password"
              value={formState.password}
              onChange={handleChange}
              placeholder="password"
            />
            <button
              className="mt-1 mb-8 w-[75%] border border-black p-1 rounded"
              // onClick={() => setOpen(false)}
            >
              Generate
            </button>
            <button
              className="my-1 w-[75%] border border-black p-1 rounded"
              // onClick={() => setOpen(false)}
            >
              Save
            </button>
            {/* <button
              className="my-1 w-[75%] border border-black p-1 rounded"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button> */}
          </div>
        </div>
      </div>
    </Dialog>
  );
};
