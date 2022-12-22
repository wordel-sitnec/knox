import React, { useState, useContext, useEffect } from "react";
import { Dialog } from "@headlessui/react";

import VaultContext from "../../store/contexts/vaultContext";
import vaultActions from "../../store/actions/vaultActions";
import { UrbitContext } from "../../store/contexts/urbitContext";
import { DialogContext } from "../../store/contexts/dialogContext";
import dialogActions from "../../store/actions/dialogActions";
import { aesEncrypt, generatePassword, getSecret } from "../../utils";

export const AddDialog = (props) => {
  const { password: pword } = props;
  const [urbitApi] = useContext(UrbitContext);
  const [, vaultDispatch] = useContext(VaultContext);
  const [dialogState, dialogDispatch] = useContext(DialogContext);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showPass, setShowPass] = useState(true);

  const [formState, setFormState] = useState({
    website: "",
    username: "",
    password: pword ?? "",
  });

  const { closeAddDialog } = dialogActions;
  const { setVault } = vaultActions;

  // reset form state when modal closes
  useEffect(() => {
    setFormState({
      website: "",
      username: "",
      password: pword ?? "",
    });
  }, [dialogState.addOpen]);

  // TODO: validate form - improve this
  useEffect(() => {
    if (formState.website && formState.username && formState.password)
      setDisabled(false);
    else setDisabled(true);
  }, [formState]);

  // clear error and success messages after 5 seconds
  useEffect(() => {
    if (success)
      setTimeout(() => {
        setSuccess(false);
        setFormState({ website: "", username: "", password: "" });
      }, 5000);
    if (error) setTimeout(() => setError(false), 7000);
  }, [success, error]);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = () => {
    const pass = generatePassword();
    setFormState({
      ...formState,
      password: pass,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formState.password);
  };

  const handleSuccess = (res) => {
    // TODO: log for dev, remove later
    setSuccess(true);
    setDisabled(true);
    setLoading(false);
    handleScry();
  };

  const handleError = (err) => {
    // TODO: log for error, remove later
    console.log("err", err);
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

  const handleAdd = () => {
    setLoading(true);
    urbitApi
      .poke({
        app: "knox",
        mark: "knox-action",
        json: {
          add: {
            website: aesEncrypt(formState.website, getSecret()),
            username: aesEncrypt(formState.username, getSecret()),
            password: aesEncrypt(formState.password, getSecret()),
          },
        },
      })
      .then(() => handleSuccess())
      .catch((err) => handleError(err));
  };

  return (
    <Dialog
      open={dialogState.addOpen}
      onClose={() => dialogDispatch(closeAddDialog())}
    >
      <div className="fixed inset-0 flex flex-col items-center justify-center h-screen">
        <div className="border border-black border-t-4 bg-white rounded-md w-[95%] sm:w-[450px] sm:h-screen60 sm:max-h-[420px] shadow-lg pb-14">
          <div className="flex flex-col items-center h-[100%] pt-1">
            <button
              onClick={() => dialogDispatch(closeAddDialog())}
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
            <div className="w-3/4 flex justify-between">
              <input
                className="my-1 border border-black p-1 w-full"
                name="password"
                value={formState.password}
                onChange={handleChange}
                placeholder="password"
                type={!showPass ? "password" : ""}
              />
              <button onClick={() => setShowPass(!showPass)} className="pl-1">
                {!showPass ? "show" : "hide"}
              </button>
            </div>
            <button
              onClick={handleGenerate}
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
                {!loading ? "Save" : <div className="animate-spin">~</div>}
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
            {!error && Boolean(formState?.password?.length) && (
              <button
                onClick={handleCopy}
                className="mt-1 mb-6 w-[75%] border border-black p-1 rounded"
              >
                Copy password
              </button>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};
