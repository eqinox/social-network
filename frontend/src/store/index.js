import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./user/user-slice";
import notificationSlice from "./notification/notification-slice";
import articleSlice from "./article/article-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    notification: notificationSlice.reducer,
    articles: articleSlice.reducer,
  },
});

export default store;
