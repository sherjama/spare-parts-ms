import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Parts: JSON.parse(localStorage.getItem("userParts")) || [],
  Shelves: JSON.parse(localStorage.getItem("userShelve")) || [],
  reloadTriggerPart: 0,
  reloadTriggerShelve: 0,
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
    triggerReloadPart: (state) => {
      state.reloadTriggerPart += 1;
    },
    triggerReloadShelve: (state) => {
      state.reloadTriggerShelve += 1;
    },
  },
});

export const { addParts, addShelves, triggerReloadPart, triggerReloadShelve } =
  stockSlice.actions;
export default stockSlice.reducer;
