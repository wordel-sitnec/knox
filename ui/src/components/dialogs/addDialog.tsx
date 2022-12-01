// @ts-nocheck
import React, { useState, useContext, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import bcrypt from "bcryptjs";

import { UrbitContext } from "../../store/contexts/urbitContext";

const saltRounds = 10;

export const AddDialog = (props) => {
  const { open, setOpen, password } = props;
  const [urbitApi] = useContext(UrbitContext);
  const [hashes, setHashes] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  // use this to trigger error div in form

  const [formState, setFormState] = useState({
    website: "",
    username: "",
    password: password ?? "",
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

  const getHashes = async () => {
    let hashes = {};
    Object.entries(formState).forEach((entry) => {
      const [key, value] = entry;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(value, salt, function (err, hash) {
          if (err) {
            // set an error here for error div
            console.log(err);
            return;
          }
          hashes[key] = hash;
        });
      });
    });
    return hashes;
  };

  // this feels so close but doesn't work, why
  const handleAdd = async () => {
    await getHashes().then((res) =>
      urbitApi
        .poke({
          app: "knox",
          mark: "knox-action",
          json: {
            add: {
              website: res.website,
              username: res.username,
              password: res.password,
            },
          },
        })
        .then((res) => console.log("success", res))
        .catch((err) => console.log("err", err))
    );
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
