import { Message } from "@/utils/type/conversation";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type MessageSlice = {
  current?: string;
  data: {
    [key: string]: Message[];
  };
};

const initValue: MessageSlice = {
  data: {},
};

export const messageSlice = createSlice({
  name: "message",
  initialState: initValue,
  reducers: {
    setMessages: (
      state,
      action: PayloadAction<{ key: string; messages: Message[] }>
    ) => {
      state.data[action.payload.key] = action.payload.messages;
    },
    addMessage: (
      state,
      action: PayloadAction<{ key: string; message: Message }>
    ) => {
      // console.log("d", state.data[action.payload.key]);
      state.data[action.payload.key] = [
        ...state.data[action.payload.key],
        action.payload.message,
      ];
    },
    setCurrent: (state, action: PayloadAction<string>) => {
      state.current = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMessages, setCurrent, addMessage } = messageSlice.actions;

export default messageSlice.reducer;
