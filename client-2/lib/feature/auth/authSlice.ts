import { authInstance } from "@/app/AuthProvider";
import apiConfig from "@/config/apiConfig";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type AuthSlice = {
  token?: string;
};

const initValue: AuthSlice = {
  token: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initValue,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      authInstance.axios = axios.create({
        baseURL: apiConfig.baseURL,
        timeout: 1000,
        headers: {
          Authorization: `Bearer ${action.payload}`,
          ...apiConfig.headers,
        },
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken } = authSlice.actions;

export default authSlice.reducer;
