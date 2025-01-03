import { createSlice } from "@reduxjs/toolkit";

import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { PropertyTypesEnum } from "@/src/Utils/Constants";

const activePropertyType: IPropertyType = PropertyTypesEnum.ResidentialRentals as IPropertyType;

export const activePropertyTypeSlice = createSlice({
  name: "activePropertyType",
  initialState: {
    value: activePropertyType,
  },
  reducers: {
    setActivePropertyType: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setActivePropertyType } = activePropertyTypeSlice.actions;
export default activePropertyTypeSlice.reducer;
