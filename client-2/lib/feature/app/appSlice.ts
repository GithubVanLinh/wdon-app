import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface NotifyState {
  notify?: string;
}

const initialState: NotifyState = {};

const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    showNotify: (state, action: PayloadAction<string>) => {
      state.notify = action.payload;
    },
    hideNotify: (state) => {
      state.notify = undefined;
    },
  },
});

export const { showNotify, hideNotify } = appSlice.actions;

export default appSlice.reducer;
