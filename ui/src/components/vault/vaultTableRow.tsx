// @ts-nocheck
import React, { useState, useEffect } from "react";
import bcrypt from "bcryptjs";

import { password } from "./password";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";

export function VaultTableRow(props) {
  const { pass } = props;

  const [passHidden, setPassHidden] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editVals, setEditVals] = useState({
    website: pass.website,
    username: pass.username,
    password: pass.password,
  });
  const [seeMenu, setSeeMenu] = useState(false);

  const [visible, setVisible] = useState(true);
  const [referenceRef, setReferenceRef] = useState(null);
  const [popperRef, setPopperRef] = useState(null);

  const handleShowPass = () => {
    setPassHidden(!passHidden);
  };

  const handleMenu = () => {
    setSeeMenu(!seeMenu);
  };

  const handleSetEdit = () => {
    setEditVals({
      website: pass.website,
      username: pass.username,
      password: pass.password,
    });
    setEditing(!editing);
  };

  const handleSetEditVals = (e) => {
    setEditVals({
      ...editVals,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setVisible(false);
      }, "3500");
    }
  }, [visible]);

  const handleCopy = (e) => {
    if (e.target.value) {
      navigator.clipboard.writeText(e.target.value);
      setVisible(true);
    }
    /* Alert the copied text */
    // alert("Copied the text: " + e.target.value);
  };

  const { styles, attributes } = usePopper(referenceRef, popperRef, {
    placement: "right",
    modifiers: [
      {
        name: "offset",
        enabled: true,
        options: {
          offset: [7, 3],
        },
      },
    ],
  });

  return (
    <>
      <tr className="bg-white hover:bg-gray-100 border-b">
        {editing ? (
          <td className="p-2">
            <input
              onChange={handleSetEditVals}
              value={editVals.website}
              name="website"
            ></input>
          </td>
        ) : (
          <Popover className="hover:bg-gray-100">
            <td className="p-2">
              <Popover.Button
                ref={setReferenceRef}
                onClick={handleCopy}
                //   className="px-1 z-10"
                className="py-2 sm:px-4 hover:bg-gray-200"
                data-tooltip-target="tooltip-default"
                value={pass.website}
              >
                {pass.website}
              </Popover.Button>
              {visible && (
                <Popover.Panel
                  id="arrow"
                  ref={setPopperRef}
                  style={styles.popper}
                  {...attributes.popper}
                >
                  <ion-icon id="copy-icon" name="copy-outline"></ion-icon>
                  {/* <p className="text-s text-gray-800 whitespace-nowrap">
                    copied to clipboard
                  </p> */}
                </Popover.Panel>
              )}
            </td>
          </Popover>
        )}

        {editing ? (
          <td className="p-2">
            <input
              onChange={handleSetEditVals}
              value={editVals.username}
              name="username"
            ></input>
          </td>
        ) : (
          // wrap this in popover for copying
          <td className="p-2">
            <button
              onClick={handleCopy}
              className="py-2 sm:px-4 hover:bg-gray-200"
              value={pass.username}
            >
              {pass.username}
            </button>
          </td>
        )}

        {editing ? (
          <td className="p-2">
            <input
              onChange={handleSetEditVals}
              placeholder={passHidden ? "password hidden" : null}
              value={passHidden ? "" : editVals.password}
              name="password"
            ></input>
          </td>
        ) : (
          <td className="py-2">
            <button
              onClick={handleCopy}
              className="py-2 px-2 hover:bg-gray-200 z-0"
              // why wont it copy if password is hidden
              value={pass.password}
            >
              {passHidden ? password() : pass.password}
            </button>
          </td>
        )}

        <td className="py-4">
          <button onClick={handleShowPass}>
            {passHidden ? (
              <ion-icon name="eye"></ion-icon>
            ) : (
              <ion-icon name="eye-off"></ion-icon>
            )}
          </button>
        </td>

        {editing ? (
          <td>
            <button>
              <ion-icon name="trash"></ion-icon>
            </button>
            <button onClick={handleSetEdit}>
              <ion-icon name="close"></ion-icon>
            </button>
            <button>
              <ion-icon name="checkmark"></ion-icon>
            </button>
          </td>
        ) : (
          <td>
            <button onClick={handleSetEdit}>
              <ion-icon name="create-outline"></ion-icon>
            </button>
          </td>
        )}
      </tr>
    </>
  );
}