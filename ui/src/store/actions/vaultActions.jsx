export const actionTypes = {
  SET_VAULT: "SET_VAULT",
};

export const actions = {
  setVault: (vault) => ({
    type: actionTypes.SET_VAULT,
    vault: vault,
  }),
};

export default actions;
