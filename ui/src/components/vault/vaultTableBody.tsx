// @ts-nocheck
import React from "react";
import { VaultTableRow } from "./vaultTableRow";

export function VaultTableBody(props) {
  const { searchValue, data } = props;

  return (
    <table className="w-full overflow-y-auto text-m text-gray-500 text-gray-400">
      <thead className="sticky top-0 bg-white z-50 border-b-2">
        <tr className="text-left">
          {/* <tr className="text-center"> */}
          <th className="">site</th>
          <th className="">username</th>
          <th className="">password</th>
          <th className="px-3">view</th>
          <th className="px-3">edit</th>
        </tr>
      </thead>
      <tbody className="w-auto">
        {!searchValue
          ? data.map((pass, i) => {
              return <VaultTableRow key={i} pass={pass} />;
            })
          : data.map((pass, i) => {
              if (
                pass.website
                  .toLowerCase()
                  .includes(searchValue.toLowerCase()) ||
                pass.username.toLowerCase().includes(searchValue.toLowerCase())
              )
                return <VaultTableRow key={i} pass={pass} />;
            })}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
}
