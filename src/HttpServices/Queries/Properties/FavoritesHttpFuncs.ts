import axios from "axios";

import { favoritePropertyRoutes } from "@/src/BackendRoutes/Properties/Favorites/FavoritesPropertyRoutes";
import { ICommercialPropertyForSaleWithManager } from "@/src/GlobalTypes/Property/Commercial/ForSaleTypes";
import { ICommercialRentalPropertyWithManager } from "@/src/GlobalTypes/Property/Commercial/RentalTypes";
import { IResidentialRentalPropertyWithManager } from "@/src/GlobalTypes/Property/Residential/RentalTypes";
import { IResidentialPropertyForSaleWithManager } from "@/src/GlobalTypes/Property/Residential/ForSaleTypes";
import { IStandPropertyWithManager } from "@/src/GlobalTypes/Property/Stand/StandTypes";
import { ILandPropertyWithManager } from "@/src/GlobalTypes/Property/Land/LandTypes";

export const getCommercialPropertyForSaleFavoritesHttpFunc = (requestData: {
  userId: number;
  accessToken: string;
  page: number;
  pageLimit: number;
}) => {
  return axios.get<{
    properties: ICommercialPropertyForSaleWithManager[];
    totalPages: number;
    count: number;
  }>(
    `${favoritePropertyRoutes.getAndUpdateFavoriteCommercialForSaleProperties}/${requestData.userId}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getCommercialRentalPropertyFavoritesHttpFunc = (requestData: {
  userId: number;
  accessToken: string;
  page: number;
  pageLimit: number;
}) => {
  return axios.get<{
    properties: ICommercialRentalPropertyWithManager[];
    totalPages: number;
    count: number;
  }>(
    `${favoritePropertyRoutes.getAndUpdateFavoriteCommercialRentalProperties}/${requestData.userId}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getResidentialRentalPropertyFavoritesHttpFunc = (requestData: {
  userId: number;
  accessToken: string;
  page: number;
  pageLimit: number;
}) => {
  return axios.get<{
    properties: IResidentialRentalPropertyWithManager[];
    totalPages: number;
    count: number;
  }>(
    `${favoritePropertyRoutes.getAndUpdateFavoriteResidentialRentalProperties}/${requestData.userId}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getResidentialPropertyForSaleFavoritesHttpFunc = (requestData: {
  userId: number;
  accessToken: string;
  page: number;
  pageLimit: number;
}) => {
  return axios.get<{
    properties: IResidentialPropertyForSaleWithManager[];
    totalPages: number;
    count: number;
  }>(
    `${favoritePropertyRoutes.getAndUpdateFavoriteResidentialForSaleProperties}/${requestData.userId}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getStandsFavoritesHttpFunc = (requestData: {
  userId: number;
  accessToken: string;
  page: number;
  pageLimit: number;
}) => {
  return axios.get<{
    properties: IStandPropertyWithManager[];
    totalPages: number;
    count: number;
  }>(
    `${favoritePropertyRoutes.getAndUpdateFavoriteStandProperties}/${requestData.userId}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getLandsFavoritesHttpFunc = (requestData: {
  userId: number;
  accessToken: string;
  page: number;
  pageLimit: number;
}) => {
  return axios.get<{
    properties: ILandPropertyWithManager[];
    totalPages: number;
    count: number;
  }>(
    `${favoritePropertyRoutes.getAndUpdateFavoriteLandProperties}/${requestData.userId}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};
