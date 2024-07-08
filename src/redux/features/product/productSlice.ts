import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TProduct } from "../../../globalInterface/globalInterface";


type TValue = {
  value: TProduct[];
  all: TProduct[];
  querys: {
    lowPrice?: number;
    hightPrice?: number;
    model?: string;
    brand?: string;
    releaseDate?: string;
    type?: string;
    size?: string;
    color?: string;
    material?: string;
    suspensionType?: string;
    customAttributes?: string;
    searchTerm?: string;
  };
};
const initialState: TValue = {
  value: [],
  all: [],
  querys: { lowPrice: 100, hightPrice: 1000 },
};
// product slice
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    storProductsData: (state, actions: PayloadAction<TProduct[]>) => {
      state.value = actions.payload;
    },
    storProductsAllData: (state, actions: PayloadAction<TProduct[]>) => {
      state.all = actions.payload;
    },
    setQuery: (state, actions) => {
      state.querys = actions.payload;
    },
  },
});
export const { storProductsData, storProductsAllData, setQuery } =
  productSlice.actions;
export default productSlice.reducer;
