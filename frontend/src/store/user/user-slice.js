import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") ? true : false,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  email: localStorage.getItem("email") ? localStorage.getItem("email") : null,
  id: localStorage.getItem("id") ? localStorage.getItem("id") : null,
  favourite: localStorage.getItem("favourite")
    ? JSON.parse(localStorage.getItem("favourite"))
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login(state, action) {
      const user = action.payload;
      if (!user.email) {
        return;
      }
      state.token = user.token;
      state.isLoggedIn = true;
      state.email = user.email;
      state.id = user.id;
      state.favourite = user.favourite;
      localStorage.setItem("token", user.token);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("email", user.email);
      localStorage.setItem("id", user.id);
      localStorage.setItem("favourite", JSON.stringify(user.favourite));
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
      localStorage.removeItem("favourite");
    },
    addToFavourite(state, action) {
      const favouriteArticles = action.payload;
      state.favourite = favouriteArticles;
      localStorage.setItem("favourite", JSON.stringify(favouriteArticles));
    }
  },
});

export const userActions = userSlice.actions;

export default userSlice;
