import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type MessageSlice = {
  current?: string;
  data: {
    [key: string]: Array<string>;
  };
};

const initValue: MessageSlice = {
  data: {},
};

export const messageSlice = createSlice({
  name: "message",
  initialState: initValue,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{ key: string; messages: string[] }>
    ) => {
      state.data[action.payload.key] = action.payload.messages;
    },
    setCurrent: (state, action: PayloadAction<string>) => {
      state.current = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMessage, setCurrent } = messageSlice.actions;

export default messageSlice.reducer;
