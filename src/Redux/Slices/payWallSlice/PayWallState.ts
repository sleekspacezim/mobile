import { createSlice } from "@reduxjs/toolkit";

const hasPayWall: boolean = true;

export const payWallSlice = createSlice({
  name: "hasPayWall",
  initialState: {
    value: hasPayWall,
  },
  reducers: {
    updatePayWall: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { updatePayWall } = payWallSlice.actions;
export default payWallSlice.reducer;
