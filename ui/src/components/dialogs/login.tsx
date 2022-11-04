// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";

export const Login = () => {
  const [open, setOpen] = useState(true);
  const [secret, setSecret] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) navigate("/apps/knox/");
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    console.log("secret", secret);
    window.sessionStorage.setItem("secret", secret);
    navigate("/apps/knox/");
  };

  const handleChange = (e) => {
    setSecret(e.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center h-screen pb-36">
        <div className="border-4 border-black bg-white rounded-md min-w-1/4">
          <Dialog.Description>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <input
                type="password"
                name="secret"
                value={secret}
                placeholder="set your secret"
                onChange={(e) => handleChange(e)}
                className="text-black border border-black my-8 mx-12 p-1"
              ></input>
              <button
                className="border-black border-solid border rounded mb-8 mx-12"
                type="submit"
              >
                Confirm
              </button>
            </form>
          </Dialog.Description>
        </div>
      </div>
    </Dialog>
  );
};
