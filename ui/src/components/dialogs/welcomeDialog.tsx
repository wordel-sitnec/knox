// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";

export const WelcomeDialog = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center w-[95%] sm:max-w-[60%] xl:max-w-[40%]">
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
        <Tab.Panels className="border-l-4 border-r-4 border-b-4 border-black bg-white h-[40%] sm:h-1/2 px-8 pt-6 pb-4 flex flex-col justify-between">
          <Tab.Panel>
            Welcome to Knox, a vault for your web2 passwords. <br />
            Remember, urbit is not really secure. <br />
            Also, other disclaimers and stuff.
          </Tab.Panel>
          <Tab.Panel>
            Set secret here Set secret here Set secret here Set secret hereSet
            secret here Set secret here Set secret here Set secret here Set
            secret here Set secret here Set secret here Set secret here Set
            secret here Set secret here Set secret here Set secret here
          </Tab.Panel>
          <Tab.Panel>Get Started</Tab.Panel>
          <div className="flex justify-end mb-4 mr-2">
            <button
              disabled={selectedIndex === 0}
              className={`mx-2 ${selectedIndex === 0 ? `text-gray-300` : ""}`}
              onClick={() => setSelectedIndex(selectedIndex - 1)}
            >
              back
            </button>
            <button
              className="mx-2"
              onClick={() =>
                selectedIndex === 2
                  ? navigate("/apps/knox/")
                  : setSelectedIndex(selectedIndex + 1)
              }
            >
              next
            </button>
          </div>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
