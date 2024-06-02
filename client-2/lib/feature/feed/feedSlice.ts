import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export type FeedTab =
  | "home"
  | "search"
  | "notifications"
  | "message"
  | "cube"
  | "communications"
  | "profile";

type FeedSlice = {
  currentTab: FeedTab;
};

const initValue: FeedSlice = {
  currentTab: "home",
};

export const feedSlice = createSlice({
  name: "auth",
  initialState: initValue,
  reducers: {
    setTab: (state, action: PayloadAction<FeedTab>) => {
      state.currentTab = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTab } = feedSlice.actions;

export default feedSlice.reducer;
