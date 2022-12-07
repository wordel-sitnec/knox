// @ts-nocheck
import React, { useState, useEffect, useContext } from "react";

import { UrbitContext } from "../../store/contexts/urbitContext";
import { DialogContext } from "../../store/contexts/dialogContext";
import dialogActions from "../../store/actions/dialogActions";

import { password } from "./password";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";
import { aesDecrypt, aesEncrypt } from "../../utils";

// TODO: need to get settings from settings context, change what happens with delete button accordingly
// show warning ? modal : just delete
export function VaultTableRow(props) {
  // TODO: remove mocks
  const { pass } = props;
  const mockEntry = { ...pass, id: parseInt("3718284774") };

  const [, dialogDispatch] = useContext(DialogContext);
  const { openDeleteDialog, openEditDialog } = dialogActions;

  const [passHidden, setPassHidden] = useState(true);
  const [visible, setVisible] = useState(true);
  const [referenceRef, setReferenceRef] = useState(null);
  const [popperRef, setPopperRef] = useState(null);

  const handleShowPass = () => {
    setPassHidden(!passHidden);
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
    // TODO: do I actually want this alert
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
        {/*
         * TODO: popover causing some layout difficulties,
         * namely sizing, centering, overflow..
         * may remove, but then how to signal copy?
         * */}
        <Popover className="hover:bg-gray-100 max-w-full">
          <td className="p-2 max-w-full">
            <Popover.Button
              ref={setReferenceRef}
              onClick={handleCopy}
              className="py-2 sm:px-4 hover:bg-gray-200 max-w-full overflow-x-auto"
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
                <ion-icon id="copy-icon" name="copy-outline" />
              </Popover.Panel>
            )}
          </td>
        </Popover>

        {/* TODO: wrap this in popover for copying - each popover needs to be own component I think */}
        <td className="p-2">
          <button
            onClick={handleCopy}
            className="py-2 sm:px-4 hover:bg-gray-200 max-w-full overflow-x-auto"
            value={pass.username}
          >
            {pass.username}
          </button>
        </td>

        <td className="py-2">
          <button
            onClick={handleCopy}
            // TODO: change 200px below - need to set this to different screen sizes
            className="py-2 px-2 hover:bg-gray-200 z-0 max-w-full overflow-x-auto whitespace-nowrap"
            // TODO: why wont it copy if password is hidden
            value={pass.password}
          >
            {passHidden ? password() : pass.password}
          </button>
        </td>

        <td className="text-center">
          <button onClick={handleShowPass}>
            {passHidden ? (
              <ion-icon name="eye"></ion-icon>
            ) : (
              <ion-icon name="eye-off"></ion-icon>
            )}
          </button>
        </td>

        <td className="text-center">
          {/* TODO: Delete button here next to edit now. Should come back to this UX */}
          <button
            // TODO: make sure the arg below is correct shape - see dialog actions
            onClick={() => dialogDispatch(openEditDialog(mockEntry))}
            className="px-2"
          >
            <ion-icon name="pencil"></ion-icon>
          </button>
          <button
            // TODO: make sure the arg below is correct shape - need id
            onClick={() => dialogDispatch(openDeleteDialog("12345"))}
            className="px-2"
          >
            <ion-icon name="trash"></ion-icon>
          </button>
        </td>
      </tr>
    </>
  );
}
