import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") ? true : false,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  email: localStorage.getItem("email") ? localStorage.getItem("email") : null,
  id: localStorage.getItem("id") ? localStorage.getItem("id") : null,
  favourite: localStorage.getItem("favourite")
    ? JSON.parse(localStorage.getItem("favourite"))
    : [],
  notes:
    localStorage.getItem("notes") !== (undefined || null)
      ? JSON.parse(localStorage.getItem("notes"))
      : [],
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
      state.notes = user.notes;
      localStorage.setItem("token", user.token);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("email", user.email);
      localStorage.setItem("id", user.id);
      localStorage.setItem("favourite", JSON.stringify(user.favourite));
      localStorage.setItem("notes", JSON.stringify(user.notes));
    },
    logout(state) {
      state.id = null;
      state.token = null;
      state.isLoggedIn = false;
      state.email = null;
      state.notes = null;
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("email");
      localStorage.removeItem("id");
      localStorage.removeItem("favourite");
      localStorage.removeItem("notes");
    },
    addToFavourite(state, action) {
      const favouriteArticles = action.payload;
      state.favourite = favouriteArticles;
      localStorage.setItem("favourite", JSON.stringify(favouriteArticles));
    },
    addNote(state, action) {
      const note = action.payload;
      console.log(note);
      if (state.notes.some((item) => item.article === note.article)) {
        const index = state.notes.findIndex((item) => item.article === note.article);
        state.notes[index] = note;
      } else {
        state.notes.push(note);
        localStorage.setItem("notes", JSON.stringify(state.notes));
      }
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
