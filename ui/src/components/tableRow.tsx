// @ts-nocheck
import React, { useState, useEffect } from "react";

import { password } from "./password";
import { EditButton } from "./editButton";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";

export function TableRow(props) {
  const { pass } = props;

  const [passHidden, setPassHidden] = useState(true);
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

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setVisible(false);
        // reduce this to 3 or 4 seconds
      }, "4000");
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

        <td className="p-2">
          <button
            onClick={handleCopy}
            className="py-2 sm:px-4 hover:bg-gray-200"
            value={pass.username}
          >
            {pass.username}
          </button>
        </td>
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

        <td className="py-4">
          <button onClick={handleShowPass}>
            {passHidden ? (
              <ion-icon name="eye"></ion-icon>
            ) : (
              <ion-icon name="eye-off"></ion-icon>
            )}
          </button>
        </td>
        <td className="py-4">
          <EditButton pass={pass} />
        </td>
      </tr>
    </>
  );
}
