import type { RootState } from "..";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {};

const ShopSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
});

export const {} = ShopSlice.actions;

export default ShopSlice.reducer;
