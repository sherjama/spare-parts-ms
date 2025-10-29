import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import partsService from "../services/parts.service.js";
import shelvesService from "../services/shelves.service.js";
import reportsService from "../services/reports.service.js";

export const fetchAllStock = createAsyncThunk(
  "stock/fetchAllStock",
  async (userId, { rejectWithValue }) => {
    try {
      const [partsRes, shelvesRes, purchaseRes, sellRes] = await Promise.all([
        partsService.getAllParts(userId),
        shelvesService.listShelves(),
        reportsService.getPurchaseBill(),
        reportsService.getSellBill(),
      ]);

      return {
        parts: partsRes.data.data,
        shelves: shelvesRes.data.data,
        purchaseBills: purchaseRes.data.data,
        sellBills: sellRes.data.data,
      };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to load inventory data"
      );
    }
  }
);

const initialState = {
  Parts: JSON.parse(localStorage.getItem("userParts")) || [],
  Shelves: JSON.parse(localStorage.getItem("userShelve")) || [],
  PurchaseBills: [],
  SellBills: [],
  reloadTriggerPart: 0,
  reloadTriggerShelve: 0,
  loading: false,
  error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStock.fulfilled, (state, action) => {
        const { parts, shelves, purchaseBills, sellBills } = action.payload;
        state.Parts = parts;
        state.Shelves = shelves;
        state.PurchaseBills = purchaseBills;
        state.SellBills = sellBills;
        state.loading = false;

        localStorage.setItem("userParts", JSON.stringify(parts));
        localStorage.setItem("userShelve", JSON.stringify(shelves));
      })
      .addCase(fetchAllStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addParts, addShelves, triggerReloadPart, triggerReloadShelve } =
  stockSlice.actions;

export default stockSlice.reducer;
