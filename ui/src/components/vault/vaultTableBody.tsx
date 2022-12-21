// @ts-nocheck
import React, { useContext } from "react";
import { VaultContext } from "../../store/contexts/vaultContext";

import { VaultTableRow } from "./vaultTableRow";

export function VaultTableBody(props) {
  const { vault, searchValue } = props;

  return (
    <tbody className="w-auto">
      {!searchValue
        ? vault.map((entry, i) => {
            return <VaultTableRow key={i} entry={entry} />;
          })
        : vault.map((entry, i) => {
            if (
              entry.website.toLowerCase().includes(searchValue.toLowerCase()) ||
              entry.username.toLowerCase().includes(searchValue.toLowerCase())
            )
              return <VaultTableRow key={i} entry={entry} />;
          })}
    </tbody>
  );
}
