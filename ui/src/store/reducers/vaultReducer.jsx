import { actionTypes } from "../actions/vaultActions";
import { aesDecrypt, getSecret, parseNumber } from "../../utils";

export const vaultReducer = (state, action) => {
  if (!action || !action.type) return state;

  switch (action.type) {
    case actionTypes.SET_VAULT: {
      // TODO: do I want to decrypt here? it makes search easier later
      const vault = action.vault;
      let newVault = [];
      vault.forEach((entry) => {
        newVault.push({
          id: parseNumber(entry.id),
          website: aesDecrypt(entry.website, getSecret()),
          username: aesDecrypt(entry.username, getSecret()),
          password: aesDecrypt(entry.password, getSecret()),
          updated: entry.updated,
        });
      });
      return newVault;
    }
  }
};
