import { createSlice } from "@reduxjs/toolkit";

const initialUIState = {
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUIState,
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        tittle: action.payload.title,
        message: action.payload.message,
      };
    },
    hideNotification(state) {
      state.notification = null;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
