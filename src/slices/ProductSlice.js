import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiConfig } from "../http-common";

const initialState = {
  products: [],
  loading: false,
  featuredProducts: [],
  featuredProductsLoading: false,
};

export const retrieveProducts = createAsyncThunk(
  "products/retrieve",
  async () => {
    const res = await apiConfig.get("/reactjsTest/products");
    return res.data;
  }
);

export const retrievefeaturedProducts = createAsyncThunk(
  "featuredProduct/retrieve",
  async () => {
    const res = await apiConfig.get("/reactjsTest/featured");
    return res.data;
  }
);

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(retrieveProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(retrieveProducts.pending, (state, action) => {
      state.products = [];
      state.loading = true;
    });
    builder.addCase(retrievefeaturedProducts.fulfilled, (state, action) => {
      state.featuredProducts = action.payload;
      state.featuredProductsLoading = false;
    });
    builder.addCase(retrievefeaturedProducts.pending, (state, action) => {
      state.featuredProductsLoading = true;
      state.featuredProducts = [];
    });
  },
});

export default ProductSlice.reducer;
