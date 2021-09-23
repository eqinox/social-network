import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: localStorage.getItem("isLoggedIn") ? true : false,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  username: localStorage.getItem("username") ? localStorage.getItem("username") : null,
  id: localStorage.getItem("id") ? localStorage.getItem("id") : null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const user = action.payload;
      state.token = user.token;
      state.isAuthenticated = true;
      state.username = user.email;
      state.id = user.id;
      localStorage.setItem("token", user.token);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("username", user.username);
      localStorage.setItem("id", user.id);
    },
    logout(state) {},
  },
});

export const authActions = authSlice.actions;

export default authSlice;
