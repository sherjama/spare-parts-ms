import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Parts: JSON.parse(localStorage.getItem("userParts")),
  Shelves: JSON.parse(localStorage.getItem("userShelve")),
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    addParts: (state, action) => {
      state.Parts = action.payload;

      localStorage.setItem("userParts", JSON.stringify(action.payload));
    },
    addShelves: (state, action) => {
      state.Shelves = action.payload;

      localStorage.setItem("userShelve", JSON.stringify(action.payload));
    },
  },
});

export const { addParts, addShelves } = stockSlice.actions;
export default stockSlice.reducer;
