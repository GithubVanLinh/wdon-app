import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./feature/auth/authSlice";
import postSlice from "./feature/post/postSlice";
import feedSlice from "./feature/feed/feedSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      post: postSlice,
      feed: feedSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
