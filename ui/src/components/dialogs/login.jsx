import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { getSecret, storeSecret } from "../../utils";

export const Login = () => {
  const [open, setOpen] = useState(true);
  const [secret, setSecret] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (getSecret()) navigate("/apps/knox/");
  });

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setSecret(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    storeSecret(secret);
    navigate("/apps/knox/");
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <div className="fixed inset-0 flex flex-col items-center justify-center h-screen">
        <div className="border-2 border-black border-t-4 bg-white rounded-md w-[95%] sm:w-[450px] h-[35%] flex justify-center items-center shadow-lg pb-10">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-col m-2">
              <button
                type="button"
                onClick={handleShowPassword}
                className="self-end"
              >
                {showPassword ? "hide" : "show"}
              </button>
              <input
                type={!showPassword ? "password" : null}
                name="secret"
                value={secret}
                placeholder="set your secret"
                onChange={handleChange}
                className="text-black border border-black p-1"
              ></input>
            </div>

            <button
              disabled={!secret}
              className="border-black border-solid border rounded m-2"
              type="submit"
            >
              set secret
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};
