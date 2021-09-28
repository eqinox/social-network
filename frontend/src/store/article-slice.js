import { createSlice } from "@reduxjs/toolkit";

const initialArticleState = {
  all: [],
};

const articleSlice = createSlice({
  name: "articles",
  initialState: initialArticleState,
  reducers: {
    getAll(state, action) {
      const articles = action.payload;
      state.all = articles;
    },
  },
});

export const articleActions = articleSlice.actions;

export default articleSlice;
