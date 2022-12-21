// @ts-nocheck
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";

import { UrbitContext } from "../../store/contexts/urbitContext";
import { SettingsContext } from "../../store/contexts/settingsContext";
import settingsActions from "../../store/actions/settingsActions";
import { getSecret, storeSecret } from "../../utils";

export const WelcomeDialog = () => {
  const [urbitApi] = useContext(UrbitContext);
  const [, settingsDispatch] = useContext(SettingsContext);
  const { setSettings } = settingsActions;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [secret, setSecret] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [showSecretThatYouSet, setShowSecretThatYouSet] = useState(false);
  const [dontShow, setDontShow] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    urbitApi
      .subscribe({
        app: "knox",
        path: "/updates",
        event: handleEvent,
      })
      // TODO: use this to set an error?
      .catch((err) => console.log("err", err));
  }, []);

  const handleEvent = (upd) => {
    console.log("init", upd);
    if (upd.init) {
      const settings = upd.init.settings;
      settingsDispatch(setSettings(settings));
    }
  };

  const handleSaveSettings = () => {
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
      .then(() => navigate("/apps/knox/"))
      .catch((err) => setError(true));
  };

  const handleNext = () => {
    if (selectedIndex === 3) {
      if (dontShow) handleSaveSettings();
      else navigate("/apps/knox/");
    } else setSelectedIndex(selectedIndex + 1);
  };

  const handleSecret = (e) => {
    setSecret(e.target.value);
  };

  const handleSetSecret = (secret) => {
    storeSecret(secret);
    setSecret("");
  };

  return (
    <div className="flex flex-col justify-center w-[95%] lg:max-w-[40%]">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List>
          <Tab className="w-1/4">
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
          <Tab className="w-1/4">
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
          <Tab className="w-1/4">
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
          <Tab className="w-1/4">
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
        <Tab.Panels className="border-l-2 border-r-2 border-b-2 border-black bg-white md:min-h-[25%] px-8 pt-6 pb-4 flex flex-col justify-between">
          <Tab.Panel>
            Welcome to <span className="font-bold">Knox</span>, a vault for your
            web2 passwords. <br />
            <br />
            Remember,{" "}
            <a
              href="https://twitter.com/pcmonk/status/1563634078779592709"
              target="_blank"
              className="underline"
            >
              urbit is not really secure yet.
            </a>{" "}
            <br />
            <br />
            Due to this, Knox alpha includes design decisions that will change
            as due diligence in the broader urbit ecosystem is completed (see{" "}
            <a
              href="https://roadmap.urbit.org/project/userspace-permissioning"
              target="_blank"
              className="underline"
            >
              userspace permissioning
            </a>
            , for example).
            <br />
            <br />
            <span className="font-bold">
              For now, this means you should treat this app as insecure and
              should not save any sensitive information in it.
            </span>
            <br />
            <br />
          </Tab.Panel>
          <Tab.Panel>
            For now, none of your raw information (including your secret cipher)
            is actually saved to your urbit - Knox entries are encrypted and
            decrypted client side with a secret set to session storage.
            <br />
            <br />
            This means Knox cannot tell if you've successfully "logged in" -
            this will only become apparent when Knox is unable to decipher your
            entries.
            <br />
            <br />
            This also means that any entries saved using the wrong secret will
            be undecipherable later with the correct secret, messing up your
            vault. This will all get sorted out in due time, but for now{" "}
            <span className="font-bold">be careful.</span>
            <br />
            <br />
          </Tab.Panel>
          <Tab.Panel>
            <br />
            Set your secret here:
            <br />
            <div className="mt-1 mb-4">
              <input
                className="border border-black p-1 w-[60%]"
                placeholder="secret"
                onChange={handleSecret}
                value={secret}
                type={!showSecret ? "password" : null}
              />
              <div className="inline ml-2">
                <button
                  className="border border-black p-1 px-2"
                  onClick={() => setShowSecret(!showSecret)}
                >
                  {showSecret ? "hide" : "show"}
                </button>
                <button
                  className="border border-black p-1 px-2 ml-2"
                  onClick={() => handleSetSecret(secret)}
                >
                  save
                </button>
              </div>
            </div>
            Do not forget this, write it down or something.
            <br />
            <br />
            You can change your secret here (just use the form above again), but
            once you save an entry using a secret you probably shouldn't change
            it. The ability to change your secret, along with the re-encrypting
            of all the data that entails, is coming post alpha.
            <div>
              <button
                onClick={() => setShowSecretThatYouSet(!showSecretThatYouSet)}
                className="border border-black p-1 px-2 mt-3"
              >
                Show me my secret
              </button>
              {showSecretThatYouSet && (
                <p className="pt-2">
                  Your secret is{" "}
                  <span className="font-bold">{getSecret()}</span>
                </p>
              )}
            </div>
            <br />
          </Tab.Panel>
          <Tab.Panel>
            Get Started
            {/* TODO: input align is a little off on mobile  */}
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
