import { createSlice } from "@reduxjs/toolkit";
import { ISearchLocation } from "@/src/GlobalTypes/LocationIQ/LocationIQTypes";
import { emptyLocation } from "@/src/Utils/Constants";

const mapLocation: string | ISearchLocation = emptyLocation;
export const mapLocationSlice = createSlice({
  name: "mapLocation",
  initialState: {
    value: mapLocation,
  },
  reducers: {
    addMapLocation: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { addMapLocation } = mapLocationSlice.actions;
export default mapLocationSlice.reducer;
