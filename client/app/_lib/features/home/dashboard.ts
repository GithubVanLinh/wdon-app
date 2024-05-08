import { createSlice } from "@reduxjs/toolkit";

export type DashboardState = {
  target: "home" | "friend";
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    target: "home",
  } as DashboardState,
  reducers: {
    chooseHome: (state) => {
      state.target = "home";
    },
    chooseFriend: (state) => {
      state.target = "friend";
    },
  },
});

export const { chooseFriend, chooseHome } = dashboardSlice.actions;
export default dashboardSlice.reducer;
