import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./user-slice";
import notificationSlice from "./notification-slice";

const store = configureStore({
  reducer: { user: userSlice.reducer, notification: notificationSlice.reducer }
})

export default store;