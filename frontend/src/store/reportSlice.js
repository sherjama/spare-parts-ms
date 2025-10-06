import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  purchaseBills: JSON.parse(localStorage.getItem("purchase-bills")),
  sellBills: JSON.parse(localStorage.getItem("sell-bills")),
};

const reportSlice = createSlice({
  name: "Reports",
  initialState,
  reducers: {
    purchase: (state, action) => {
      state.purchaseBills = action.payload;
      localStorage.setItem("purchase-bills", JSON.stringify(action.payload));
    },
    sell: (state, action) => {
      state.sellBills = action.payload;
      localStorage.setItem("sell-bills", JSON.stringify(action.payload));
    },
  },
});

export const { purchase, sell } = reportSlice.actions;
export default reportSlice.reducer;
