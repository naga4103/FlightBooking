import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  journeyType: "",
  stateReturnDate: false,
  clickedSearch: false,
  dates: { startDate: "", endDate: "" },
  country: "India",
  fromCities: [],
  fromTo: { from: "", to: "" },
  toCities: [],
  userDetails: { email: "", password: "" },
  errorMsg: { email: "", password: "" },
  value: "",
  searchResults: [],
  searchValue: "",
  debounceTime: null,
  token: "",
};

export const adminSignUp = createAsyncThunk(
  "/viewTickets",
  async (thunkApi) => {
    try {
      let Authorization = `Bearer ${localStorage.getItem("jwtToken")}`;

      console.log(
        "🚀 ~ file: flightSlice.js:28 ~ Authorization:",
        Authorization
      );
      const response = await axios.get(
        "http://localhost:8011/api/v1/users/viewTickets",

        {
          headers: {
            Authorization: `${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      console.log("🚀 ~ file: flightSlice.js:41 ~ response:", response);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setJourneyType: (state, eventValue) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      //   state.value += 1;
      console.log("Journey Type before", state.journeyType);
      console.log("Journey Type event", eventValue);
      //    setClickedSearch(false);
      state.clickedSearch = false;
      if (eventValue === "Single") {
        //  setJourneyType(e.target.value);
        state.journeyType = eventValue;
        //  setStateReturnDate(false);
        state.stateReturnDate = false;
      } else {
        //  setJourneyType(e.target.value);
        state.journeyType = eventValue;
        //  setStateReturnDate(true);
        state.stateReturnDate = true;
      }
    },
    setClickedSearch: (state, value) => {
      //   state.value -= 1;
      state.clickedSearch = value;
    },

    setStateReturnDate: (state, value) => {
      state.stateReturnDate = value;
    },

    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },

    setDates: (state, value) => {
      console.log("value sad", value.payload);
      state.dates = { ...state.dates, ...value.payload };
    },

    setCountry: (state, value) => {
      state.country = value;
    },

    setFromCities: (state, value) => {
      state.fromCities = value;
    },

    setFromTo: (state, value) => {
      state.fromTo = { ...state.fromTo, ...value.payload };
    },
    setToCities: (state, value) => {
      state.toCities = value;
    },

    setUserDetails: (state, value) => {
      state.userDetails = { ...state.userDetails, ...value.payload };
    },
    setErrorMsg: (state, value) => {
      state.errorMsg = { ...state.errorMsg, ...value.payload };
    },
    setValue: (state, value) => {
      state.value = value;
    },
    setSearchResults: (state, value) => {
      state.searchResults = value;
    },
    setSearchValue: (state, value) => {
      state.searchValue = value;
    },
    setDebounceTime: (state, value) => {
      state.debounceTime = value;
    },
    setToken: (state, value) => {
      state.token = value;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  incrementByAmount,
  setJourneyType,
  setClickedSearch,
  setDates,
  setCountry,
  setFromCities,
  setFromTo,
  setToCities,
  setStateReturnDate,
  setErrorMsg,
  setUserDetails,
  setValue,
  setSearchResults,
  setSearchValue,
  setDebounceTime,
  setToken,
} = counterSlice.actions;

export default counterSlice.reducer;
