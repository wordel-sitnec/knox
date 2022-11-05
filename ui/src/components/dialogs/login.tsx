// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import bcrypt from "bcryptjs";

const saltRounds = 10;

export const Login = () => {
  const [open, setOpen] = useState(true);
  const [secret, setSecret] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) navigate("/apps/knox/");
  }, [open]);

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setSecret(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.sessionStorage.setItem("secret", secret);
    navigate("/apps/knox/");
  };

  // below is working example, but I think I can just save in plain text?
  //   const storeSecret = (s) => {
  //     bcrypt.genSalt(saltRounds, function (err, salt) {
  //       bcrypt.hash(s, salt, function (err, hash) {
  //         // handle error - snack?
  //         if (err) {
  //           console.log(err);
  //           return;
  //         }
  //         window.sessionStorage.setItem("secret", hash);
  //       });
  //     });
  //   };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <div className="fixed inset-0 flex flex-col items-center justify-center h-screen">
        <div className="border border-black border-t-4 bg-white rounded-md w-[95%] sm:w-[450px] h-[35%] flex justify-center items-center shadow-lg pb-10">
          <Dialog.Description>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="flex flex-col m-2">
                <button onClick={handleShowPassword} className="self-end">
                  {showPassword ? "hide" : "show"}
                </button>
                <input
                  type={!showPassword ? "password" : null}
                  name="secret"
                  value={secret}
                  placeholder="set your secret"
                  onChange={(e) => handleChange(e)}
                  className="text-black border border-black p-1"
                ></input>
              </div>

              <button
                className="border-black border-solid border rounded m-2"
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
