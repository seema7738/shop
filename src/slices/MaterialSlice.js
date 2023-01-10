import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiConfig } from "../http-common";

const initialState = {
  productMaterial: [],
  loading: false,
  error: null,
};

export const getMaterials = createAsyncThunk("/material", async () => {
  const res = await apiConfig.get("/reactjsTest/material");
  return res.data;
});

const materialSlice = createSlice({
  name: "material",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMaterials.fulfilled, (state, action) => {
      state.productMaterial = action.payload;
      state.loading = false;
    });
    builder.addCase(getMaterials.pending, (state, action) => {
      state.productMaterial = [];
      state.loading = true;
    });
    builder.addCase(getMaterials.rejected, (state, action) => {
      state.productMaterial = action.error.message;
      state.loading = false;
    });
  },
});

export default materialSlice.reducer;
