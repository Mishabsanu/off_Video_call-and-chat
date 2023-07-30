import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  user: null;
  token?: {
    accessToken: null | string;
  };
  loading: boolean;
}

const initialState = {
  user: null,
  token: {
    accessToken: null,
    refreshToken: null,
  },
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = {
        accessToken: null,
        refreshToken: null,
      };
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    startLoading: (state) => {
      state.loading = true;
    },
  },
});

export const { setLogin, setLogout, setToken, startLoading } =
  authSlice.actions;
export default authSlice.reducer;
