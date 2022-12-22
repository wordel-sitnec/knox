export const actionTypes = {
  OPEN_SETTINGS: "OPEN_SETTINGS",
  CLOSE_SETTINGS: "CLOSE_SETTINGS",
  SET_SETTINGS: "SET_SETTINGS",
};

export const actions = {
  openSettings: () => ({
    type: actionTypes.OPEN_SETTINGS,
  }),
  closeSettings: () => ({
    type: actionTypes.CLOSE_SETTINGS,
  }),
  setSettings: (settings) => ({
    type: actionTypes.SET_SETTINGS,
    settings: settings,
  }),
};

export default actions;
