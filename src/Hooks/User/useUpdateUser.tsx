import { useEffect } from "react";

import { useAppDispatch } from "@/src/Redux/Hooks/Config";
import {
  addAccessToken,
  addContactNumbers,
  addEmailAddress,
  addFamilyName,
  addFavoriteCommercialForSaleProperties,
  addFavoriteCommercialRentalProperties,
  addFavoriteLandProperties,
  addFavoriteResidentialForSaleProperties,
  addFavoriteResidentialRentalProperties,
  addFavoriteStands,
  addGivenName,
  addLocation,
  addProfilePicture,
  addUserId,
} from "@/src/Redux/Slices/UserSlice/User";
import { IUser } from "@/src/GlobalTypes/User/UserTypes";

const useUpdateUser = (user: IUser | null) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) {
      dispatch(addEmailAddress(user.email));
      dispatch(addFamilyName(user.familyName));
      dispatch(addGivenName(user.givenName));
      dispatch(addUserId(user.id));
      dispatch(addLocation(user.location));
      dispatch(addContactNumbers(user.contactNumbers));
      dispatch(addProfilePicture(user.profilePicture))
      dispatch(addAccessToken(user.accessToken))
      dispatch(addFavoriteCommercialForSaleProperties(user.favoriteCommercialForSaleProperties))
      dispatch(addFavoriteCommercialRentalProperties(user.favoriteCommercialRentalProperties))
      dispatch(addFavoriteResidentialForSaleProperties(user.favoriteResidentialForSaleProperties))
      dispatch(addFavoriteResidentialRentalProperties(user.favoriteResidentialRentalProperties))
      dispatch(addFavoriteStands(user.favoriteStands))
      dispatch(addFavoriteLandProperties(user.favoriteLandProperties))
    }
  }, [user]);
};

export default useUpdateUser;
