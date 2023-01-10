import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiConfig } from "../http-common";

const initialState = {
  productColor: [],
  loading: false,
  error: null,
};

export const getColor = createAsyncThunk("/color", async () => {
  const res = await apiConfig.get("/reactjsTest/colors");
  return res.data;
});

const sideBarSlice = createSlice({
  name: "color",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getColor.fulfilled, (state, action) => {
      state.productColor = action.payload;
      state.loading = false;
    });
    builder.addCase(getColor.pending, (state) => {
      state.productColor = [];
      state.loading = true;
    });
    builder.addCase(getColor.rejected, (state, action) => {
      state.productColor = action.error.message;
      state.loading = false;
    });
  },
});

export default sideBarSlice.reducer;
