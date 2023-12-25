export const ADD_CLIENT = "ADD_CLIENT";
export const DELETE_CLIENT = "DELETE_CLIENT";
export const SAVE_CLIENT = "SAVE_CLIENT";

export const addNewClient = () => ({
  type: ADD_CLIENT,
});

export const deleteClient = (clientId) => ({
  type: DELETE_CLIENT,
  payload: {
    clientId,
  },
});

export const saveClient = (editedClientInfo) => ({
  type: SAVE_CLIENT,
  payload: {
    editedClientInfo,
  },
});
