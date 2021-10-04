import { createSlice } from "@reduxjs/toolkit";

const initialArticleState = {
  all: [],
  selectedArticle: null,
  image: null
};

const articleSlice = createSlice({
  name: "articles",
  initialState: initialArticleState,
  reducers: {
    getAll(state, action) {
      state.all = action.payload;
    },
    getSelected(state, action) {
      state.selectedArticle = action.payload;
    },
    setImage(state, action) {
      console.log(action.payload);
      state.image = action.payload;
    }
  },
});

export const articleActions = articleSlice.actions;

export default articleSlice;
