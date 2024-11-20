import { configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./Slices/UserSlice/User";
import { payWallSlice} from "./Slices/payWallSlice/PayWallState";
import { themeSlice } from "./Slices/Theme/Theme";
import { managerAccountSlice } from "./Slices/ManagerAccountSlice/ManagerSlice";
import { mapLocationSlice } from "./Slices/MapLocationSlice/MapLocationSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    hasPayWall: payWallSlice.reducer,
    theme: themeSlice.reducer,
    managerAccount: managerAccountSlice.reducer,
    mapLocation: mapLocationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: {
        warnAfter: 100,
        ignoredPaths: ["largeData"],
      },
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
