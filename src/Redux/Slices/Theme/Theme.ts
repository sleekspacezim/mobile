import { createSlice } from "@reduxjs/toolkit";

type ITheme = "light"|"dark"

const theme: ITheme = "dark" as ITheme;
export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: theme,
  },
  reducers: {
    switchTheme: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { switchTheme } = themeSlice.actions;
export default themeSlice.reducer;
