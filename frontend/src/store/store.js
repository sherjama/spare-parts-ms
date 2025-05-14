import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";

const store = configureStore({
  reducer: {
    userdata: authSlice,
  },
});

export default store;
