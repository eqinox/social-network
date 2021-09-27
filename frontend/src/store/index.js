import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./user-slice";
import notificationSlice from "./notification-slice";
import articleSlice from "./article-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    notification: notificationSlice.reducer,
    articles: articleSlice.reducer,
  },
});

export default store;
