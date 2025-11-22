import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from "../utils/loadLocalStorage.js";

const initialState = {
  status: loadFromLocalStorage("status", null),
  userdata: loadFromLocalStorage("userdata", null),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userdata = action.payload;

      localStorage.setItem("userdata", JSON.stringify(action.payload));
      localStorage.setItem("status", JSON.stringify(true));
    },
    logout: (state, action) => {
      state.status = false;
      state.userdata = null;
      localStorage.clear();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
