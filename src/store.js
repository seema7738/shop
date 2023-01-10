import { configureStore } from "@reduxjs/toolkit";
import MaterialSlice from "./slices/MaterialSlice";
import ProductSlice from "./slices/ProductSlice";
import SidebarSlice from "./slices/SidebarSlice";

export const store = configureStore({
  reducer: {
    product: ProductSlice,
    color: SidebarSlice,
    material: MaterialSlice,
  },
  devTools: true,
});
