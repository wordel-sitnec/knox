// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const Login = () => {
  const [open, setOpen] = useState(true);
  const [secret, setSecret] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) navigate("/apps/knox/");
  }, [open]);

  const handleChange = (e) => {
    setSecret(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    storeSecret(e.target.value);
    navigate("/apps/knox/");
  };

  const storeSecret = (s) => {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(s, salt, function (err, hash) {
        // handle error - snack?
        if (err) console.log(err);
        window.sessionStorage.setItem("secret", hash);
      });
    });
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
        <div className="border-4 border-black bg-white rounded-md w-[95%] sm:w-[450px] h-[45%] justify-center">
          <Dialog.Description>
            {/* why is this form not centered, stuff is centered in it */}
            <form
              className="flex flex-col w-[99%] sm:w-5/6 justify-center"
              onSubmit={handleSubmit}
            >
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
