import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface NotifyState {
  notify?: string;
  isConnectSocket: boolean;
}

const initialState: NotifyState = {
  isConnectSocket: false,
};

const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    connectedSocket: (state) => {
      state.isConnectSocket = true;
    },
    disconnectedSocket: (state) => {
      state.isConnectSocket = false;
    },
    showNotify: (state, action: PayloadAction<string>) => {
      state.notify = action.payload;
    },
    hideNotify: (state) => {
      state.notify = undefined;
    },
  },
});

export const { showNotify, hideNotify, connectedSocket, disconnectedSocket } =
  appSlice.actions;

export default appSlice.reducer;
