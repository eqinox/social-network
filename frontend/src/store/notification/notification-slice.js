import { createSlice } from "@reduxjs/toolkit";

const initialNotificationState = {
  smallNotification: false,
  status: null,
  message: null,
  show: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialNotificationState,
  reducers: {
    showGlobalNotification(state, action) {
      const notification = action.payload;
      state.show = true;
      state.message = notification.message;
      state.status = notification.status;
    },
    hideGlobalNotification(state) {
      state.show = false;
      state.message = null;
      state.status = null;
    },
    showSmallNotification(state) {
      state.smallNotification = true;
    },
    hideSmallNotification(state) {
      state.smallNotification = false;
    }
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
