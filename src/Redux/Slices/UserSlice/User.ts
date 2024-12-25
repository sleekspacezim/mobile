import { IUser } from "@/src/GlobalTypes/User/UserTypes";
import { createSlice } from "@reduxjs/toolkit";

const user: IUser = {
  email: "",
  givenName: "",
  familyName: "",
  contactNumbers: [],
  location: null,
  id: 0,
  accessToken: "",
  role:"user",
  profilePicture: {
    name: "",
    id: 0,
    userId: 0,
    contentType: "",
    size: 0,
    fileType: "",
    uri: "",
  },
  favoriteCommercialForSaleProperties: [],
  favoriteCommercialRentalProperties: [],
  favoriteLandProperties: [],
  favoriteResidentialForSaleProperties: [],
  favoriteResidentialRentalProperties: [],
  favoriteStands: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: user,
  },
  reducers: {
    addGivenName: (state, action) => {
      state.value = {
        ...state.value,
        givenName: action.payload,
      };
    },
    addEmailAddress: (state, action) => {
      state.value = {
        ...state.value,
        email: action.payload,
      };
    },
    addFamilyName: (state, action) => {
      state.value = {
        ...state.value,
        familyName: action.payload,
      };
    },
    addUserId: (state, action) => {
      state.value = {
        ...state.value,
        id: action.payload,
      };
    },
    addProfilePicture: (state, action) => {
      state.value = {
        ...state.value,
        profilePicture: action.payload,
      };
    },
    addContactNumbers: (state, action) => {
      state.value = {
        ...state.value,
        contactNumbers: action.payload,
      };
    },
    addLocation: (state, action) => {
      state.value = {
        ...state.value,
        location: action.payload,
      };
    },
    addAccessToken: (state, action) => {
      state.value = {
        ...state.value,
        accessToken: action.payload,
      };
    },
    addFavoriteResidentialForSaleProperties: (state, action) => {
      state.value = {
        ...state.value,
        favoriteResidentialForSaleProperties: action.payload,
      };
    },
    addFavoriteResidentialRentalProperties: (state, action) => {
      state.value = {
        ...state.value,
        favoriteResidentialRentalProperties: action.payload,
      };
    },
    addFavoriteCommercialRentalProperties: (state, action) => {
      state.value = {
        ...state.value,
        favoriteCommercialRentalProperties: action.payload,
      };
    },
    addFavoriteCommercialForSaleProperties: (state, action) => {
      state.value = {
        ...state.value,
        favoriteCommercialForSaleProperties: action.payload,
      };
    },
    addFavoriteStands: (state, action) => {
      state.value = {
        ...state.value,
        favoriteStands: action.payload,
      };
    },
    addFavoriteLandProperties: (state, action) => {
      state.value = {
        ...state.value,
        favoriteLandProperties: action.payload,
      };
    },
  },
});
export const {
  addGivenName,
  addEmailAddress,
  addFamilyName,
  addUserId,
  addProfilePicture,
  addContactNumbers,
  addLocation,
  addAccessToken,
  addFavoriteCommercialForSaleProperties,
  addFavoriteCommercialRentalProperties,
  addFavoriteLandProperties,
  addFavoriteResidentialForSaleProperties,
  addFavoriteResidentialRentalProperties,
  addFavoriteStands,
} = userSlice.actions;
export default userSlice.reducer;
