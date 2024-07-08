import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TMaintenanceAndServicingRequestPopulate } from "../../../globalInterface/globalInterface";



type TValue = {
  value: TMaintenanceAndServicingRequestPopulate[];

};
const initialState: TValue = {
  value: [],
};
// product slice
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    storMaintenanceAndServicingRequestData: (state, actions: PayloadAction<TMaintenanceAndServicingRequestPopulate[]>) => {
      state.value = actions.payload;
    },
  },
});
export const {storMaintenanceAndServicingRequestData  } =
  productSlice.actions;
export default productSlice.reducer;
