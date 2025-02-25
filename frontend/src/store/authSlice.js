import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: JSON.parse(localStorage.getItem("status")),
  userdata: JSON.parse(localStorage.getItem("userdata")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userdata = action.payload;
    },
    logout: (state, action) => {
      state.status = false;
      state.userdata = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
