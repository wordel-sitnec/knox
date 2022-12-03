// @ts-nocheck
import React, { useState, useContext, useEffect } from "react";
import { Dialog } from "@headlessui/react";

import { UrbitContext } from "../../store/contexts/urbitContext";
import { getHash } from "../../utils";

import rabbit from "crypto-js/rabbit";

export const AddDialog = (props) => {
  const { open, setOpen, password: pword } = props;
  const [urbitApi] = useContext(UrbitContext);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [formState, setFormState] = useState({
    website: "",
    username: "",
    password: pword ?? "",
    // this doesn't work, why
  });

  const rabbitTest = async () => {
    const hella = await rabbit.encrypt("hi", "hi");
    console.log(hella);
  };
  rabbitTest();

  // reset form state when modal closes
  useEffect(() => {
    setFormState({
      website: "",
      username: "",
      password: pword ?? "",
    });
  }, [open]);

  // validate form - improve this
  useEffect(() => {
    if (formState.website && formState.username && formState.password)
      setDisabled(false);
    else setDisabled(true);
  }, [formState]);

  // clear error and success messages after 5 seconds
  useEffect(() => {
    if (success) setTimeout(() => setSuccess(false), 5000);
    if (error) setTimeout(() => setError(false), 7000);
  }, [success, error]);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSuccess = (res) => {
    // log for dev, remove later
    console.log("res", res);
    setSuccess(true);
    setDisabled(true);
    setLoading(false);
    setFormState({
      website: "",
      username: "",
      password: "",
    });
  };

  const handleError = (err) => {
    // log for error, remove later
    console.log("err", err);
    setLoading(false);
    setError(true);
  };

  const handleAdd = () => {
    setLoading(true);
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
      .then((res) => handleSuccess(res))
      .catch((err) => handleError(err));
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className="fixed inset-0 flex flex-col items-center justify-center h-screen">
        <div className="border border-black border-t-4 bg-white rounded-md w-[95%] sm:w-[450px] sm:h-screen60 sm:max-h-[420px] shadow-lg pb-14">
          <div className="flex flex-col items-center h-[100%] pt-1">
            <button
              onClick={() => setOpen(false)}
              className="p-1 mr-2 self-end"
            >
              {/* get color right */}
              <ion-icon name="close" />
            </button>

            <Dialog.Title className="text-xl mb-6">
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
            <button
              onClick={() => setError(!error)}
              className="mt-1 mb-6 w-[75%] border border-black p-1 rounded"
            >
              Generate
            </button>

            {!success ? (
              <button
                className={`my-1 w-[75%] border border-black p-1 rounded flex justify-center ${
                  !loading && "disabled:opacity-25 disabled:pointer-events-none"
                }`}
                onClick={handleAdd}
                disabled={disabled}
              >
                {!loading ? (
                  "Save"
                ) : (
                  <svg
                    className="animate-spin h-6 w-6 rounded-full border-black border-t-2 border-solid"
                    viewBox="0 0 24 24"
                  />
                )}
              </button>
            ) : (
              <button className="my-1 w-[75%] border border-black p-1 rounded bg-green-400">
                Success
              </button>
            )}
            {error && (
              <button className="my-1 w-[75%] border border-black p-1 rounded bg-red-400">
                Something went wrong. Try again.
              </button>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};
