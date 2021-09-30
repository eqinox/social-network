import { createSlice } from "@reduxjs/toolkit";

const initialArticleState = {
  all: [],
  selectedArticle: null,
};

const articleSlice = createSlice({
  name: "articles",
  initialState: initialArticleState,
  reducers: {
    getAll(state, action) {
      const articles = action.payload;
      state.all = articles;
    },
    getSelected(state, action) {
      state.selectedArticle = action.payload;
    },
  },
});

export const articleActions = articleSlice.actions;

export default articleSlice;
