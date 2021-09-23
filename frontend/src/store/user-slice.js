import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") ? true : false,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  email: localStorage.getItem("email") ? localStorage.getItem("email") : null,
  id: localStorage.getItem("id") ? localStorage.getItem("id") : null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login(state, action) {
      const user = action.payload;
      state.token = user.token;
      state.isLoggedIn = true;
      state.email = user.email;
      state.id = user.id;
      localStorage.setItem("token", user.token);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("email", user.email);
      localStorage.setItem("id", user.id);
    },
    logout(state) {
      state.id = null;
      state.token = null;
      state.isLoggedIn = false;
      state.email = null;
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("email");
      localStorage.removeItem("id");
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
