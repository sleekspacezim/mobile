import axios from "axios";
import { favoritePropertyRoutes } from "@/src/BackendRoutes/Properties/Favorites/FavoritesPropertyRoutes";

export const addLandFavoritePropertyHttpFunc = (requestData: {
  favouritePropertyId: number;
  accessToken: string;
  userId: number;
}) => {
  return axios.put(
    `${favoritePropertyRoutes.getAndUpdateFavoriteLandProperties}/add/${requestData.userId}`,
    { id: requestData.favouritePropertyId },
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const removeLandFavoritePropertyHttpFunc = (requestData: {
  favouritePropertyId: number;
  accessToken: string;
  userId: number;
}) => {
  return axios.put(
    `${favoritePropertyRoutes.getAndUpdateFavoriteLandProperties}/remove/${requestData.userId}`,
    { id: requestData.favouritePropertyId },
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const addStandFavoritePropertyHttpFunc = (requestData: {
  favouritePropertyId: number;
  accessToken: string;
  userId: number;
}) => {
  return axios.put(
    `${favoritePropertyRoutes.getAndUpdateFavoriteStandProperties}/add/${requestData.userId}`,
    { id: requestData.favouritePropertyId },
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const removeStandFavoritePropertyHttpFunc = (requestData: {
  favouritePropertyId: number;
  accessToken: string;
  userId: number;
}) => {
  return axios.put(
    `${favoritePropertyRoutes.getAndUpdateFavoriteStandProperties}/remove/${requestData.userId}`,
    { id: requestData.favouritePropertyId },
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const addFavoriteCommercialForSalePropertyHttpFunc = (requestData: {
  favouritePropertyId: number;
  accessToken: string;
  userId: number;
}) => {
  return axios.put(
    `${favoritePropertyRoutes.getAndUpdateFavoriteCommercialForSaleProperties}/add/${requestData.userId}`,
    { id: requestData.favouritePropertyId },
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const removeFavoriteCommercialForSalePropertyHttpFunc = (requestData: {
  favouritePropertyId: number;
  accessToken: string;
  userId: number;
}) => {
  return axios.put(
    `${favoritePropertyRoutes.getAndUpdateFavoriteCommercialForSaleProperties}/remove/${requestData.userId}`,
    { id: requestData.favouritePropertyId },
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const addFavoriteCommercialRentalPropertyHttpFunc = (requestData: {
  favouritePropertyId: number;
  accessToken: string;
  userId: number;
}) => {
  return axios.put(
    `${favoritePropertyRoutes.getAndUpdateFavoriteCommercialRentalProperties}/add/${requestData.userId}`,
    { id: requestData.favouritePropertyId },
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const removeFavoriteCommercialRentalPropertyHttpFunc = (requestData: {
  favouritePropertyId: number;
  accessToken: string;
  userId: number;
}) => {
  return axios.put(
    `${favoritePropertyRoutes.getAndUpdateFavoriteCommercialRentalProperties}/remove/${requestData.userId}`,
    { id: requestData.favouritePropertyId },
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const addFavoriteResidentialRentalPropertyHttpFunc = (requestData: {
  favouritePropertyId: number;
  accessToken: string;
  userId: number;
}) => {
  return axios.put(
    `${favoritePropertyRoutes.getAndUpdateFavoriteResidentialRentalProperties}/add/${requestData.userId}`,
    { id: requestData.favouritePropertyId },
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const removeFavoriteResidentialRentalPropertyHttpFunc = (requestData: {
  favouritePropertyId: number;
  accessToken: string;
  userId: number;
}) => {
  return axios.put(
    `${favoritePropertyRoutes.getAndUpdateFavoriteResidentialRentalProperties}/remove/${requestData.userId}`,
    { id: requestData.favouritePropertyId },
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const addFavoriteResidentialForSalePropertyHttpFunc = (requestData: {
  favouritePropertyId: number;
  accessToken: string;
  userId: number;
}) => {
  return axios.put(
    `${favoritePropertyRoutes.getAndUpdateFavoriteResidentialForSaleProperties}/add/${requestData.userId}`,
    { id: requestData.favouritePropertyId },
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const removeFavoriteResidentialForSalePropertyHttpFunc = (requestData: {
  favouritePropertyId: number;
  accessToken: string;
  userId: number;
}) => {
  return axios.put(
    `${favoritePropertyRoutes.getAndUpdateFavoriteResidentialForSaleProperties}/remove/${requestData.userId}`,
    { id: requestData.favouritePropertyId },
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};
