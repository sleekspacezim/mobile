import { IManagerAccount } from "@/src/GlobalTypes/Manager/ManagerTypes";
import { createSlice } from "@reduxjs/toolkit";

const managerAccount: IManagerAccount = {
  name: "",
  email: "",
  id: 0,
  userId: 0,
  contacts: [],
  profilePicture: {
    size: 0,
    contentType: "",
    fileType: "",
    managerId: 0,
    id: 0,
    uri: "",
    name: "",
  },
};
export const managerAccountSlice = createSlice({
  name: "managerAccount",
  initialState: {
    value: managerAccount,
  },
  reducers: {
    addManagerAccount: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { addManagerAccount } = managerAccountSlice.actions;
export default managerAccountSlice.reducer;
