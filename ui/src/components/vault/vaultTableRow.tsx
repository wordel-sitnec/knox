// @ts-nocheck
import React, { useState, useEffect, useContext } from "react";

import { UrbitContext } from "../../store/contexts/urbitContext";
import { DialogContext } from "../../store/contexts/dialogContext";
import dialogActions from "../../store/actions/dialogActions";

import { password } from "./password";

// TODO: need to get settings from settings context, change what happens with delete button accordingly
// show warning ? modal : just delete
export function VaultTableRow(props) {
  // TODO: remove mocks
  const { pass } = props;
  const mockEntry = { ...pass, id: parseInt("3718284774") };

  const [, dialogDispatch] = useContext(DialogContext);
  const { openDeleteDialog, openEditDialog } = dialogActions;

  const defaultVisible = {
    site: false,
    user: false,
    pass: false,
  };

  const [passHidden, setPassHidden] = useState(true);
  const [visible, setVisible] = useState(defaultVisible);

  const handleShowPass = () => {
    setPassHidden(!passHidden);
  };

  // set a timeout to hide copy icon
  useEffect(() => {
    if (Object.values(visible).some((val) => val === true)) {
      setTimeout(() => {
        setVisible(defaultVisible);
      }, "3500");
    }
  }, [visible]);

  // TODO: this doesn't work on iOS, revisit
  const handleCopy = (e) => {
    if (e.target.value) {
      navigator.clipboard.writeText(e.target.value);
      setVisible({
        ...visible,
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
              value={pass.website}
              name="site"
            >
              {pass.website}
            </button>
            {visible.site && <ion-icon id="copy-icon" name="copy-outline" />}
          </div>
        </td>

        <td className="p-2">
          <div className="flex justify-center items-center">
            <button
              onClick={handleCopy}
              className="py-2 sm:px-4 hover:bg-gray-200 max-w-full overflow-x-auto"
              value={pass.username}
              name="user"
            >
              {pass.username}
            </button>
            {visible.user && <ion-icon id="copy-icon" name="copy-outline" />}
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
              value={pass.password}
              name="pass"
            >
              {passHidden ? password() : pass.password}
            </button>
            {visible.pass && <ion-icon id="copy-icon" name="copy-outline" />}
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
              onClick={() => dialogDispatch(openEditDialog(mockEntry))}
              className="pr-1 md:px-2"
            >
              <ion-icon name="pencil" />
            </button>
            <button
              // TODO: make sure the arg below is correct shape - need id
              onClick={() => dialogDispatch(openDeleteDialog("12345"))}
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
