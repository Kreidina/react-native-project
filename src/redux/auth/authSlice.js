import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  name: null,
  email: null,
  avaImg: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      name: payload.name,
      email: payload.emailUser,
      avaImg: payload.avaImg,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => ({ state: initialState }),
  },
});

export const authReducer = authSlice.reducer;
