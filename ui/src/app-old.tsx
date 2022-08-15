// @ts-nocheck
import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Charges, ChargeUpdateInitial, scryCharges } from '@urbit/api';
import { AppTile } from './components/AppTile';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function App() {
  const [apps, setApps] = useState();
  const [vals, setVals] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    async function init() {
      console.log('in useeffect');
      api.subscribe({ app: "delta", path: "/values", event: handleUpdate})
      const charges = (await api.scry<ChargeUpdateInitial>(scryCharges)).initial;
      setApps(charges);
    }

    init();
  }, []);

  const handleUpdate = (upd) => { 
    console.log('upd', upd)
    console.log('vals in top', vals);
    let localValue = vals;
    console.log('local in top', localValue);
    if ('init' in upd) {
      setVals(upd.init);
    } else if ('push' in upd) {
      console.log('local in push', localValue); 
      localValue.unshift(upd.push.value)
      setVals(localValue);
    } else if ('pop' in upd) {
      localValue.shift();
      setVals(localValue);
    }
  }
  console.log('vals', vals);

  return (
    <main className="flex items-center justify-center min-h-screen border-8">
      <div className="max-w-l space-y-6 border p-2">
        <h1 className="text-3xl px-10 font-bold">knox - your password vault</h1>
        <div className="flex flex-row-reverse border px-8">
          <div className="flex-col space-y-6 p-4 mx-4 border">
            <p>Here&apos;s your urbit&apos;s installed apps:</p>
            {apps && (
              <ul className="space-y-4">
                {Object.entries(apps).map(([desk, app]) => (
                  <li key={desk} className="flex items-center space-x-3 text-sm leading-tight">
                    <AppTile {...app} />
                    <div className="flex-1 text-black">
                      <p>
                        <strong>{app.title || desk}</strong>
                      </p>
                      {app.info && <p>{app.info}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex-col space-y-6 p-4 mx-4 border text-center">
            <p>Here is the state of delta:</p>
            {vals && vals.map((val) => {
              return <p className="text-2xl">{val}</p>
            })}
          </div>
          </div>
      </div>
    </main>
  );
}
