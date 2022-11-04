// @ts-nocheck
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";

export const WelcomeDialog = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center min-w-[60%] xl:max-w-[40%]">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List>
          <Tab className="w-1/3">
            {({ selected }) => (
              <div
                className={
                  selected
                    ? "rounded-t-md bg-white text-white border-t-4 border-l-4 border-r border-black focus:outline-none"
                    : "bg-black text-black border-l border-r border-black"
                }
              >
                ...
              </div>
            )}
          </Tab>
          <Tab className="w-1/3">
            {({ selected }) => (
              <div
                className={
                  selected
                    ? "rounded-t-md bg-white text-white border-t-4 border-l border-r border-black"
                    : "bg-black text-black border-l border-r border-black"
                }
              >
                ...
              </div>
            )}
          </Tab>
          <Tab className="w-1/3">
            {({ selected }) => (
              <div
                className={
                  selected
                    ? "rounded-t-md bg-white text-white border-t-4 border-l border-r-4 border-black"
                    : "bg-black text-black border-l border-r border-black"
                }
              >
                ...
              </div>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className="border-l-4 border-r-4 border-b-4 border-black bg-white shadow-lg h-1/2 p-4">
          <Tab.Panel>Welcome, disclaimer here</Tab.Panel>
          <Tab.Panel>Set secret here</Tab.Panel>
          <Tab.Panel>Get Started</Tab.Panel>
          <button
            onClick={() =>
              selectedIndex === 2
                ? navigate("/apps/knox")
                : setSelectedIndex(selectedIndex + 1)
            }
          >
            next
          </button>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
