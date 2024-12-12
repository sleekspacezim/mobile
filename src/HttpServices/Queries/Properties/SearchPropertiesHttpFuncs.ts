import axios from "axios";

import { commercialPropertiesForSaleRoutes } from "@/src/BackendRoutes/Properties/Commercial/CommercialForSalePropertiesRoutes";
import { ICommercialPropertyForSaleWithManager } from "@/src/GlobalTypes/Property/Commercial/ForSaleTypes";
import { commercialRentalPropertiesRoutes } from "@/src/BackendRoutes/Properties/Commercial/CommercialRentalPropertiesRoutes";
import { ICommercialRentalPropertyWithManager } from "@/src/GlobalTypes/Property/Commercial/RentalTypes";
import { IResidentialPropertyForSaleWithManager } from "@/src/GlobalTypes/Property/Residential/ForSaleTypes";
import { residentialPropertiesForSaleRoutes } from "@/src/BackendRoutes/Properties/Residential/ResidentialPropertiesForSaleRoutes";
import { IResidentialRentalPropertyWithManager } from "@/src/GlobalTypes/Property/Residential/RentalTypes";
import { residentialRentalPropertiesRoutes } from "@/src/BackendRoutes/Properties/Residential/ResidentialRentalPropertiesRoutes";
import { IStandPropertyWithManager } from "@/src/GlobalTypes/Property/Stand/StandTypes";
import { standRoutes } from "@/src/BackendRoutes/Properties/Stand/StandRoutes";
import { ILandPropertyWithManager } from "@/src/GlobalTypes/Property/Land/LandTypes";
import { landRoutes } from "@/src/BackendRoutes/Properties/Land/LandRoutes";

const controller = new AbortController();

export const searchCommercialPropertiesForSaleByLocationHttpFunc =
  (requestData: {
    page: number;
    pageLimit: number;
    isUserLoggedIn: boolean;
    accessToken: string;
    location: string;
  }) => {
    return axios.get<{
      properties: ICommercialPropertyForSaleWithManager[];
      totalPages: number;
      count: number;
    }>(
      requestData.isUserLoggedIn
        ? `${commercialPropertiesForSaleRoutes.searchCommercialPropertiesForSaleByLocation}/logged-in/${requestData.location}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`
        : `${commercialPropertiesForSaleRoutes.searchCommercialPropertiesForSaleByLocation}/${requestData.location}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
      {
        signal: controller.signal,
        headers: { Authorization: `Bearer ${requestData.accessToken}` },
      }
    );
  };

export const searchCommercialRentalPropertiesByLocationHttpFunc =
  (requestData: {
    page: number;
    pageLimit: number;
    isUserLoggedIn: boolean;
    accessToken: string;
    location: string;
  }) => {
    return axios.get<{
      properties: ICommercialRentalPropertyWithManager[];
      totalPages: number;
      count: number;
    }>(
      requestData.isUserLoggedIn
        ? `${commercialRentalPropertiesRoutes.searchCommercialRentalPropertiesByLocation}/logged-in/${requestData.location}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`
        : `${commercialRentalPropertiesRoutes.searchCommercialRentalPropertiesByLocation}/${requestData.location}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
      {
        signal: controller.signal,
        headers: { Authorization: `Bearer ${requestData.accessToken}` },
      }
    );
  };

export const searchResidentialPropertiesForSaleByLocationHttpFunc =
  (requestData: {
    page: number;
    pageLimit: number;
    isUserLoggedIn: boolean;
    accessToken: string;
    location: string;
  }) => {
    return axios.get<{
      properties: IResidentialPropertyForSaleWithManager[];
      totalPages: number;
      count: number;
    }>(
      requestData.isUserLoggedIn
        ? `${residentialPropertiesForSaleRoutes.searchResidentialPropertiesForSaleByLocation}/logged-in/${requestData.location}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`
        : `${residentialPropertiesForSaleRoutes.searchResidentialPropertiesForSaleByLocation}/${requestData.location}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
      {
        signal: controller.signal,
        headers: { Authorization: `Bearer ${requestData.accessToken}` },
      }
    );
  };

export const searchResidentialRentalPropertiesByLocationHttpFunc =
  (requestData: {
    page: number;
    pageLimit: number;
    isUserLoggedIn: boolean;
    accessToken: string;
    location: string;
  }) => {
    return axios.get<{
      properties: IResidentialRentalPropertyWithManager[];
      totalPages: number;
      count: number;
    }>(
      requestData.isUserLoggedIn
        ? `${residentialRentalPropertiesRoutes.searchResidentialRentalPropertiesByLocation}/logged-in/${requestData.location}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`
        : `${residentialRentalPropertiesRoutes.searchResidentialRentalPropertiesByLocation}/${requestData.location}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
      {
        signal: controller.signal,
        headers: { Authorization: `Bearer ${requestData.accessToken}` },
      }
    );
  };

export const searchStandsByLocationHttpFunc = (requestData: {
  page: number;
  pageLimit: number;
  isUserLoggedIn: boolean;
  accessToken: string;
  location: string;
}) => {
  return axios.get<{
    properties: IStandPropertyWithManager[];
    totalPages: number;
    count: number;
  }>(
    requestData.isUserLoggedIn
      ? `${standRoutes.searchStandsByLocation}/logged-in/${requestData.location}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`
      : `${standRoutes.searchStandsByLocation}/${requestData.location}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
    {
      signal: controller.signal,
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const searchLandPropertiesByLocationHttpFunc = (requestData: {
  page: number;
  pageLimit: number;
  isUserLoggedIn: boolean;
  accessToken: string;
  location: string;
}) => {
  return axios.get<{
    properties: ILandPropertyWithManager[];
    totalPages: number;
    count: number;
  }>(
    requestData.isUserLoggedIn
      ? `${landRoutes.searchLandPropertiesByLocation}/logged-in/${requestData.location}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`
      : `${landRoutes.searchLandPropertiesByLocation}/${requestData.location}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
    {
      signal: controller.signal,
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};
