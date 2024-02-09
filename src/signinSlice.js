import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// const userFromLocalStorage = {
//   success: 1,
//   message: "User Verified",
//   data: { token, userName},
// } ;

const initialState = {
  loading: false,
  error: null,
  //   data: userToken ? userFromLocalStorage : null,
  data: null,
};

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (payload, thunkApi) => {
    try {
      const { email, password } = payload;
      const { data } = await axios.post(
        "http://localhost:8011/api/v1/users/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});
