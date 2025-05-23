import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import loadSlice from "./loadSlice.js";

const store = configureStore({
  reducer: {
    userdata: authSlice,
    Loading: loadSlice,
  },
});

export default store;
