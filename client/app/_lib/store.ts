import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/logged";
import dashboardReducer from "./features/home/dashboard";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      dashboard: dashboardReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
