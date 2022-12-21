// @ts-nocheck
import React, { useState, useEffect, useContext } from "react";

import { DialogContext } from "../../store/contexts/dialogContext";
import dialogActions from "../../store/actions/dialogActions";

import { password } from "./password";

// TODO: need to get settings from settings context, change what happens with delete button accordingly
// show warning ? modal : just delete
export function VaultTableRow(props) {
  // TODO: remove mocks
  const { entry } = props;

  const [, dialogDispatch] = useContext(DialogContext);
  const { openDeleteDialog, openEditDialog } = dialogActions;

  const defaultCopied = {
    site: false,
    user: false,
    pass: false,
  };

  const [passHidden, setPassHidden] = useState(true);
  const [copied, setCopied] = useState(defaultCopied);

  const handleShowPass = () => {
    setPassHidden(!passHidden);
  };

  // set a timeout to hide copy icon
  useEffect(() => {
    if (Object.values(copied).some((val) => val === true)) {
      setTimeout(() => {
        setCopied(defaultCopied);
      }, "3500");
    }
  }, [copied]);

  // TODO: this doesn't work on iOS, revisit
  const handleCopy = (e) => {
    if (e.target.value) {
      navigator.clipboard.writeText(e.target.value);
      setCopied({
        ...copied,
        [e.target.name]: true,
      });
    }
  };

  return (
    <>
      <tr className="bg-white hover:bg-gray-100 border-b">
        <td className="p-2">
          <div className="flex justify-center items-center">
            <button
              onClick={handleCopy}
              className="py-2 sm:px-4 hover:bg-gray-200 max-w-full overflow-x-auto"
              value={entry.website}
              name="site"
            >
              {entry.website}
            </button>
            {copied.site && <ion-icon id="copy-icon" name="copy-outline" />}
          </div>
        </td>

        <td className="p-2">
          <div className="flex justify-center items-center">
            <button
              onClick={handleCopy}
              className="py-2 sm:px-4 hover:bg-gray-200 max-w-full overflow-x-auto"
              value={entry.username}
              name="user"
            >
              {entry.username}
            </button>
            {copied.user && <ion-icon id="copy-icon" name="copy-outline" />}
          </div>
        </td>

        {/*
         * TODO: right now can copy password even if hidden
         * might be a nice thing to add to settings
         */}
        <td className="py-2">
          <div className="flex justify-center items-center">
            <button
              onClick={handleCopy}
              className="py-2 px-2 hover:bg-gray-200 z-0 max-w-full overflow-x-auto whitespace-nowrap"
              value={entry.password}
              name="pass"
            >
              {passHidden ? password() : entry.password}
            </button>
            {copied.pass && <ion-icon id="copy-icon" name="copy-outline" />}
          </div>
        </td>

        <td className="text-center">
          <button onClick={handleShowPass}>
            {passHidden ? <ion-icon name="eye" /> : <ion-icon name="eye-off" />}
          </button>
        </td>

        <td className="text-center">
          {/* TODO: Delete button here next to edit now. Should come back to this UX */}
          <div className="whitespace-nowrap">
            <button
              // TODO: make sure the arg below is correct shape - see dialog actions
              onClick={() => dialogDispatch(openEditDialog(entry))}
              className="pr-1 md:px-2"
            >
              <ion-icon name="pencil" />
            </button>
            <button
              // TODO: make sure the arg below is correct shape - need id
              onClick={() => dialogDispatch(openDeleteDialog(entry.id))}
              className="pl-1 md:px-2"
            >
              <ion-icon name="trash" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
