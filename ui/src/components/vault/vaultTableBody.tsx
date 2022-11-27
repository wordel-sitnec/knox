// @ts-nocheck
import React from "react";
import { VaultTableRow } from "./vaultTableRow";

export function VaultTableBody(props) {
  const { searchValue, data } = props;

  return (
    <tbody className="w-auto">
      {!searchValue
        ? data.map((pass, i) => {
            return <VaultTableRow key={i} pass={pass} />;
          })
        : data.map((pass, i) => {
            if (
              pass.website.toLowerCase().includes(searchValue.toLowerCase()) ||
              pass.username.toLowerCase().includes(searchValue.toLowerCase())
            )
              return <VaultTableRow key={i} pass={pass} />;
          })}
    </tbody>
  );
}
