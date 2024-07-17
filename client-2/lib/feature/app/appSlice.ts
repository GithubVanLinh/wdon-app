import { AppTheme } from "@/config/theme";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface NotifyState {
  notify: string;
  isShowNotify: boolean;
  isConnectSocket: boolean;
  theme: AppTheme;
}

const initialState: NotifyState = {
  isConnectSocket: false,
  notify: "",
  isShowNotify: false,
  theme: "light",
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
      state.isShowNotify = true;
      state.notify = action.payload;
    },
    hideNotify: (state) => {
      state.isShowNotify = false;
    },
    setTheme: (state, action: PayloadAction<AppTheme>) => {
      state.theme = action.payload;
    },
  },
});

export const {
  showNotify,
  hideNotify,
  connectedSocket,
  disconnectedSocket,
  setTheme,
} = appSlice.actions;

export default appSlice.reducer;
