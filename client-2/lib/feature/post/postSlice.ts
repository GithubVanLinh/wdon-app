import { Post } from "@/utils/type/post";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type PostSlice = {
  posts?: Post[];
};

const initValue: PostSlice = {
  posts: undefined,
};

export const postSlice = createSlice({
  name: "post",
  initialState: initValue,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPosts } = postSlice.actions;

export default postSlice.reducer;
