import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from "../utils/loadLocalStorage.js";

const initialState = {
  theme: loadFromLocalStorage("theme", "dark"),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const selectTheme = (state) => state.theme.theme;

export default themeSlice.reducer;
