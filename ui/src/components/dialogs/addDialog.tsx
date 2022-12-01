// @ts-nocheck
import React, { useState, useContext, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import bcrypt from "bcryptjs";

import { UrbitContext } from "../../store/contexts/urbitContext";

const saltRounds = 10;

export const AddDialog = (props) => {
  const { open, setOpen, password: pword } = props;
  const [urbitApi] = useContext(UrbitContext);
  const [disabled, setDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  // use this to trigger success div in form
  const [error, setError] = useState(false);
  // use this to trigger error div in form

  const [formState, setFormState] = useState({
    website: "",
    username: "",
    password: pword ?? "",
    // this doesn't work, why
  });

  useEffect(() => {
    if (formState.website && formState.username && formState.password)
      setDisabled(false);
    else setDisabled(true);
  }, [formState]);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSuccess = (res) => {
    console.log("res", res);
    setFormState({
      website: "",
      username: "",
      password: "",
    });
  };

  const getHash = (value) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(value, salt);
    return hash;
  };

  const handleAdd = () => {
    urbitApi
      .poke({
        app: "knox",
        mark: "knox-action",
        json: {
          add: {
            website: getHash(formState.website),
            username: getHash(formState.username),
            password: getHash(formState.password),
          },
        },
      })
      // handle success message, clearing formState, anything else?
      .then((res) => handleSuccess(res))
      // handle show error
      .catch((err) => console.log("err", err));
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
              Save a new entry
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
            <button className="mt-1 mb-8 w-[75%] border border-black p-1 rounded">
              Generate
            </button>
            <button
              className="my-1 w-[75%] border border-black p-1 rounded disabled:opacity-25 disabled:pointer-events-none"
              onClick={handleAdd}
              disabled={disabled}
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
