import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import loadSlice from "./loadSlice.js";
import stockSlice from "./stockSlice.js";

const store = configureStore({
  reducer: {
    userdata: authSlice,
    Loading: loadSlice,
    stock: stockSlice,
  },
});

export default store;
