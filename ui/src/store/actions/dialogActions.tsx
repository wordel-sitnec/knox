// @ts-nocheck
export const actionTypes = {
  OPEN_DELETE: "OPEN_DELETE",
  CLOSE_DELETE: "CLOSE_DELETE",
  DELETE: "DELETE",
  OPEN_ADD: "OPEN_ADD",
  CLOSE_ADD: "CLOSE_ADD",
  OPEN_EDIT: "OPEN_EDIT",
  CLOSE_EDIT: "CLOSE_EDIT",
  OPEN_SETTINGS: "OPEN_SETTINGS",
  CLOSE_SETTINGS: "CLOSE_SETTINGS",
};

export const actions = {
  openDeleteDialog: (id) => ({
    type: actionTypes.OPEN_DELETE,
    id: id,
  }),

  closeDeleteDialog: () => ({
    type: actionTypes.CLOSE_DELETE,
  }),

  delete: () => ({
    type: actionTypes.DELETE,
  }),
  openAddDialog: () => ({
    type: actionTypes.OPEN_ADD,
  }),
  closeAddDialog: () => ({
    type: actionTypes.CLOSE_ADD,
  }),
  openEditDialog: (entry) => ({
    type: actionTypes.OPEN_EDIT,
    website: entry.website,
    username: entry.username,
    password: entry.password,
    id: entry.id,
  }),
  closeEditDialog: () => ({
    type: actionTypes.CLOSE_EDIT,
  }),
  openSettingsDialog: () => ({
    type: actionTypes.OPEN_SETTINGS,
  }),
  closeSettingsDialog: () => ({
    type: actionTypes.CLOSE_SETTINGS,
  }),
};

export default actions;
