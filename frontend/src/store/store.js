import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import loadSlice from "./loadSlice.js";
import stockSlice from "./stockSlice.js";
import reportSlice from "./reportSlice.js";
import themeSlice from "./themeSlice.js";

const store = configureStore({
  reducer: {
    userdata: authSlice,
    Loading: loadSlice,
    stock: stockSlice,
    reports: reportSlice,
    theme: themeSlice,
  },
});

export default store;
