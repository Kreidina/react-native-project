import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    handelFulfilled: (state, { payload }) => {
      console.log(state, payload);
      // state.isLoading = false;
      // state.user = payload.user;
      // state.token = payload.token;
      // state.isLoggedIn = true;
      // state.error = null;
    },
  },
});

export const authReducer = authSlice.reducer;
