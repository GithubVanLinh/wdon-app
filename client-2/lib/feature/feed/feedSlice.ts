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
    setTab: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "feed":
          state.currentTab = "home";
          break;
        case "search":
        case "notifications":
        case "message":
        case "cube":
        case "communications":
        case "profile":
          state.currentTab = action.payload;
          break;
        default:
          state.currentTab = "home";
          break;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTab } = feedSlice.actions;

export default feedSlice.reducer;
