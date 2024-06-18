import { authInstance } from "@/app/AuthProvider";
import apiConfig from "@/config/apiConfig";
import { Profile } from "@/utils/type/post";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type AuthSlice = {
  token?: string;
  profile?: Profile;
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
    logout: (state) => {
      state.token = undefined;
      authInstance.axios = undefined;
    },
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setProfile, logout } = authSlice.actions;

export default authSlice.reducer;
