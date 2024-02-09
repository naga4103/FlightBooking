import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./flightSlice";

console.log("counterReducer", counterReducer);

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
