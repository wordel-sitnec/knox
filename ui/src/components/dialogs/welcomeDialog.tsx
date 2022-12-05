// @ts-nocheck
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";

import { UrbitContext } from "../../store/contexts/urbitContext";

export const WelcomeDialog = () => {
  const [urbitApi] = useContext(UrbitContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dontShow, setDontShow] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handlePoke = () => {
    urbitApi
      .poke({
        app: "knox",
        mark: "knox-action",
        json: {
          sett: {
            "setting-key": "showWelcome",
            "setting-val": "false",
          },
        },
      })
      .then((res) => navigate("/apps/knox/"))
      .catch((err) => setError(true));
  };

  const handleNext = () => {
    if (selectedIndex === 2) {
      if (dontShow) handlePoke();
      else navigate("/apps/knox/");
    } else setSelectedIndex(selectedIndex + 1);
  };

  return (
    <div className="flex flex-col justify-center w-[95%] sm:w-[450px] xl:max-w-[40%]">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List>
          <Tab className="w-1/3">
            {({ selected }) => (
              <div
                className={
                  selected
                    ? "rounded-t-md bg-white text-white border-t-4 border-l-2 border-r border-black focus:outline-none"
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
                    ? "rounded-t-md bg-white text-white border-t-4 border-l border-r-2 border-black"
                    : "bg-black text-black border-l border-r border-black"
                }
              >
                ...
              </div>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className="border-l-2 border-r-2 border-b-2 border-black bg-white h-[45%] sm:h-1/2 px-8 pt-6 pb-4 flex flex-col justify-between">
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
          <Tab.Panel>
            Get Started
            <div className="flex mt-4">
              <input
                type="checkbox"
                checked={dontShow}
                onChange={() => setDontShow(!dontShow)}
                className="mr-2"
              />
              <button onClick={() => setDontShow(!dontShow)}>
                Don't show this welcome again
              </button>
            </div>
            {error && (
              <button className="mt-3 px-2 border border-black p-1 rounded bg-red-400 text-left">
                Something went wrong saving settings. <br /> Unselect or try
                again.
              </button>
            )}
          </Tab.Panel>
          <div className="flex justify-end mb-4 mr-2">
            <button
              disabled={selectedIndex === 0}
              className={`mx-2 ${selectedIndex === 0 ? `text-gray-300` : ""}`}
              onClick={() => setSelectedIndex(selectedIndex - 1)}
            >
              back
            </button>
            <button className="mx-2" onClick={handleNext}>
              next
            </button>
          </div>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
