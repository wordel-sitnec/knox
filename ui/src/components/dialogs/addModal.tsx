// @ts-nocheck
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

export const AddModal = (props) => {
  const { open, setOpen } = props;

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
        <div className="border border-black border-t-4 bg-white rounded-md w-[95%] sm:w-[450px] h-[35%] shadow-lg pb-10">
          <div className="flex-column">
            {/* <Dialog.Title className="text-xl">Save a new entry</Dialog.Title> */}
            <input
              name="website"
              value={formState.website}
              onChange={handleChange}
              placeholder="website"
            />
            <input
              name="username"
              value={formState.username}
              onChange={handleChange}
              placeholder="username"
            />
            <input
              name="password"
              value={formState.password}
              onChange={handleChange}
              placeholder="password"
            />
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
              save
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
