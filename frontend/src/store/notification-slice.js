import { createSlice } from "@reduxjs/toolkit";

const initialNotificationState = {
  status: null,
  message: null,
  title: null,
  show: false
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialNotificationState,
  reducers: {
    showNotification(state, action) {
      const notification = action.payload;
      state.show = true;
      state.message = notification.message;
      state.status = notification.status;
      state.title = notification.title;
    },
    hideNotification(state) {
      state.show = false;
      state.message = null;
      state.status = null;
      state.title = null;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
