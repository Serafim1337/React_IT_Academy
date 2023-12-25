import dataList from "../../dataList.json";

import { ADD_CLIENT } from "../actions/clientsActions";
import { DELETE_CLIENT } from "../actions/clientsActions";
import { SAVE_CLIENT } from "../actions/clientsActions";

const initialState = dataList.clientsList;

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLIENT: {
      const newClients = [...state];

      const newClientId = createNewClientId(newClients);

      newClients.push({
        id: newClientId,
        firstName: null,
        secondName: null,
        surname: null,
        balance: 0,
      });
      return newClients;
    }

    case DELETE_CLIENT: {
      const newClients = [...state];
      const { clientId } = action.payload;

      for (let i = 0; i < newClients.length; i++) {
        if (newClients[i].id == clientId) {
          newClients.splice(i, 1);
          break;
        }
      }

      return newClients;
    }

    case SAVE_CLIENT: {
      let newClients = [...state];
      const { editedClientInfo } = action.payload;

      for (let i = 0; i < newClients.length; i++) {
        if (newClients[i].id == editedClientInfo.id) {
          newClients[i] = { ...newClients[i], ...editedClientInfo };
        }
      }
      return newClients;
    }

    default:
      return state;
  }
};

function createNewClientId(clients) {
  const currentId = clients.reduce(
    (currId, client) => Math.max(currId, client.id),
    100
  );

  return currentId + 1;
}

export default clientsReducer;
