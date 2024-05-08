import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  logged: boolean;
  avatar: string;
  token: string | null;
}

const initialState: UserState = {
  logged: false,
  avatar: "/person.svg",
  token: null,
};

export const userSlice = createSlice({
  name: "logged",
  initialState,
  reducers: {
    loging: (state, action: PayloadAction<string | null>) => {
      state.logged = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.logged = false;
      state.token = null;
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload as string;
    },
  },
});

export const { loging, logout, setAvatar } = userSlice.actions;
export default userSlice.reducer;
