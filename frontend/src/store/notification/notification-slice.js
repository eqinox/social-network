import { createSlice } from "@reduxjs/toolkit";

const initialNotificationState = {
  status: null,
  message: null,
  show: false,
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
    },
    hideNotification(state) {
      state.show = false;
      state.message = null;
      state.status = null;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
