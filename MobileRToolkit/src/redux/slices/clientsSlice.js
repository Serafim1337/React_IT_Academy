import {
  createAsyncThunk,
  createSlice,
  nanoid,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const clientsEntityAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.lastname.localeCompare(b.lastname),
});

const initialState = clientsEntityAdapter.getInitialState({
  status: "idle", // loading, success, fail
  error: null,
});

export const fetchClientsData = createAsyncThunk(
  "clients/fetchClients",
  async () => {
    const response = await fetch(
      "https://fakerapi.it/api/v1/persons?_quantity=5"
    );
    return response.json();
  }
);

const clientsSlice = createSlice({
  name: "clients",
  initialState: initialState,
  reducers: {
    addNewClient: {
      reducer(state, action) {
        clientsEntityAdapter.addOne(state, action.payload);
      },
      prepare() {
        return {
          payload: {
            ...createPOJO(),
            id: nanoid(),
          },
        };
      },
    },

    deleteClient(state, action) {
      const clientId = action.payload;

      clientsEntityAdapter.removeOne(state, clientId);
    },
    saveClient(state, action) {
      const editedClientInfo = action.payload;

      clientsEntityAdapter.updateOne(state, editedClientInfo);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchClientsData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchClientsData.fulfilled, (state, action) => {
        state.status = "success";
        clientsEntityAdapter.setAll(state, action.payload.data);
      })
      .addCase(fetchClientsData.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
  },
});

function createPOJO() {
  return {
    id: null,
    firstname: null,
    lastname: "",
    email: null,
    phone: null,
    birthday: null,
    gender: undefined,
    address: {
      id: null,
      street: null,
      streetName: null,
      buildingNumber: null,
      city: null,
      zipcode: null,
      country: null,
      county_code: null,
      latitude: null,
      longitude: null,
    },
    website: "",
    image: "",
  };
}

export const { addNewClient, deleteClient, saveClient } = clientsSlice.actions;
export default clientsSlice.reducer;

export const { selectAll: selectAllClients } =
  clientsEntityAdapter.getSelectors((state) => state.clients);

export const selectClientsFetchStatus = (state) => state.clients.status;
