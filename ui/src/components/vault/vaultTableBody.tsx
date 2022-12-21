// @ts-nocheck
import React, { useContext } from "react";
import { VaultContext } from "../../store/contexts/vaultContext";

import { VaultTableRow } from "./vaultTableRow";

export function VaultTableBody(props) {
  const [vaultState] = useContext(VaultContext);
  const { searchValue } = props;

  return (
    <tbody className="w-auto">
      {!searchValue
        ? vaultState.map((entry, i) => {
            return <VaultTableRow key={i} entry={entry} />;
          })
        : vaultState.map((entry, i) => {
            if (
              entry.website.toLowerCase().includes(searchValue.toLowerCase()) ||
              entry.username.toLowerCase().includes(searchValue.toLowerCase())
            )
              return <VaultTableRow key={i} entry={entry} />;
          })}
    </tbody>
  );
}
