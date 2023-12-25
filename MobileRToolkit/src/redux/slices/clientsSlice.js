import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  clientsList: [
    {
      id: 1,
      firstname: "Haley",
      lastname: "O'Reilly",
      email: "lang.jake@gmail.com",
      phone: "+6223573456495",
      birthday: "2012-09-25",
      gender: "male",
      address: {
        id: 0,
        street: "6628 Langosh Walks",
        streetName: "Tromp Greens",
        buildingNumber: "2767",
        city: "Schowaltermouth",
        zipcode: "50605-9824",
        country: "Cayman Islands",
        county_code: "US",
        latitude: 64.629744,
        longitude: -176.264668,
      },
      website: "http://heaney.com",
      image: "http://placeimg.com/640/480/people",
    },
    {
      id: 2,
      firstname: "Marcos",
      lastname: "McGlynn",
      email: "wunsch.celestine@keebler.com",
      phone: "+7076031650703",
      birthday: "1982-04-28",
      gender: "male",
      address: {
        id: 0,
        street: "942 Etha Road Apt. 116",
        streetName: "Heaney Isle",
        buildingNumber: "8176",
        city: "West Alana",
        zipcode: "60718-4752",
        country: "Palau",
        county_code: "MA",
        latitude: -73.66776,
        longitude: -7.984491,
      },
      website: "http://crona.com",
      image: "http://placeimg.com/640/480/people",
    },
    {
      id: 3,
      firstname: "Lenore",
      lastname: "Langosh",
      email: "halvorson.chelsey@lockman.com",
      phone: "+2916818440144",
      birthday: "1991-01-16",
      gender: "female",
      address: {
        id: 0,
        street: "842 Tressa Canyon Apt. 947",
        streetName: "Deangelo Lane",
        buildingNumber: "26259",
        city: "East Jasenmouth",
        zipcode: "71238-5005",
        country: "Nepal",
        county_code: "SO",
        latitude: 49.225636,
        longitude: 143.343922,
      },
      website: "http://marks.biz",
      image: "http://placeimg.com/640/480/people",
    },
    {
      id: 4,
      firstname: "Breanne",
      lastname: "Runte",
      email: "tmckenzie@hotmail.com",
      phone: "+3267640615936",
      birthday: "1988-02-07",
      gender: "female",
      address: {
        id: 0,
        street: "1759 Mauricio Cape Apt. 996",
        streetName: "Klocko Mountains",
        buildingNumber: "254",
        city: "East Melyssaville",
        zipcode: "56118-7363",
        country: "Czech Republic",
        county_code: "BZ",
        latitude: 54.675632,
        longitude: -159.028078,
      },
      website: "http://rutherford.com",
      image: "http://placeimg.com/640/480/people",
    },
    {
      id: 5,
      firstname: "Kayley",
      lastname: "Rath",
      email: "michelle18@turcotte.com",
      phone: "+2261935058661",
      birthday: "2000-07-19",
      gender: "male",
      address: {
        id: 0,
        street: "83873 Aglae Mall Suite 134",
        streetName: "Celine Haven",
        buildingNumber: "86525",
        city: "Johnpaulmouth",
        zipcode: "12534-9795",
        country: "Madagascar",
        county_code: "ET",
        latitude: -18.010443,
        longitude: -169.618794,
      },
      website: "http://pfannerstill.com",
      image: "http://placeimg.com/640/480/people",
    },
  ],
  status: "idle", // loading, success, fail
  error: null,
};

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
        state.clientsList.push(action.payload);
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

      for (let i = 0; i < state.clientsList.length; i++) {
        if (state.clientsList[i].id === clientId) {
          state.clientsList.splice(i, 1);
          break;
        }
      }
    },
    saveClient(state, action) {
      const editedClientInfo = action.payload;

      for (let i = 0; i < state.clientsList.length; i++) {
        if (state.clientsList[i].id === editedClientInfo.id) {
          state.clientsList[i] = {
            ...state.clientsList[i],
            ...editedClientInfo,
          };
        }
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchClientsData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchClientsData.fulfilled, (state, action) => {
        state.status = "success";
        state.clientsList.push(...action.payload.data);
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
    lastname: null,
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

export const selectClients = () => {};

export const { addNewClient, deleteClient, saveClient } = clientsSlice.actions;
export default clientsSlice.reducer;
