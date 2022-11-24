// @ts-nocheck
import React, { useState } from "react";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";

export const EditButton = (props) => {
  const { pass } = props;

  const [visible, setVisible] = useState(false);

  const [referenceRef, setReferenceRef] = useState(null);
  const [popperRef, setPopperRef] = useState(null);

  const { styles, attributes } = usePopper(referenceRef, popperRef, {
    placement: "left",
    modifiers: [
      {
        name: "offset",
        enabled: true,
        options: {
          offset: [15, -25],
        },
      },
    ],
  });

  const handleDropdownClick = () => {
    setVisible(!visible);
  };

  const handleEdit = () => {
    console.log("edit");
  };

  const handleDelete = () => {
    console.log(
      `Are you sure you want to delete your account for ${pass.website}? This action cannot be undone`
    );
  };

  return (
    <Popover>
      <Popover.Button
        ref={setReferenceRef}
        onClick={handleDropdownClick}
        className="px-1 z-10"
      >
        <ion-icon name="ellipsis-horizontal"></ion-icon>
      </Popover.Button>
      <Popover.Panel
        ref={setPopperRef}
        style={styles.popper}
        {...attributes.popper}
      >
        <table
          style={styles.offset}
          visible={visible.toString()}
          className="bg-gray-600 rounded-lg drop-shadow-lg z-90"
        >
          <tbody>
            <tr>
              <td
                onClick={handleEdit}
                className="px-6 py-1 hover:bg-gray-300 rounded-lg"
              >
                <p className="pointer-events-none">Edit</p>
              </td>
            </tr>
            <tr>
              <td
                onClick={handleDelete}
                className="px-6 py-2 hover:bg-gray-300 rounded-lg"
              >
                <p className="pointer-events-none">Delete</p>
              </td>
            </tr>
          </tbody>
        </table>
      </Popover.Panel>
    </Popover>
  );
};
