export const actionTypes = {
  OPEN_DELETE: "OPEN_DELETE",
  CLOSE_DELETE: "CLOSE_DELETE",
  DELETE: "DELETE",
  OPEN_ADD: "OPEN_ADD",
  CLOSE_ADD: "CLOSE_ADD",
};

export const actions = {
  openDeleteDialog: () => ({
    type: actionTypes.OPEN_DELETE,
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
};

export default actions;
