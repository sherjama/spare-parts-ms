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

      localStorage.setItem("userdata", JSON.stringify(action.payload));
      localStorage.setItem("status", JSON.stringify(true));
    },
    logout: (state, action) => {
      state.status = false;
      state.userdata = null;

      localStorage.removeItem("userdata");
      localStorage.removeItem("userParts");
      localStorage.removeItem("userShelve");
      localStorage.removeItem("status");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
