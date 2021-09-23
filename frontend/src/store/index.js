import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: { authentication: authSlice.reducer, ui: uiSlice.reducer }
})

export default store;