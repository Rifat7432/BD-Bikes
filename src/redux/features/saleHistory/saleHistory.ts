import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  filter: "Yearly" | "Monthly" | "Daily" | "Weekly";
};

const initialState: TInitialState = {
  filter: "Daily",
};
// Sale History Slice
export const historySlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    storFilter: (state, actions) => {
      state.filter = actions.payload;
    },
  },
});
export const { storFilter } = historySlice.actions;
export default historySlice.reducer;
