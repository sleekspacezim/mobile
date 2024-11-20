import axios from "axios";

import { commercialPropertiesForSaleRoutes } from "@/src/BackendRoutes/Properties/Commercial/CommercialForSalePropertiesRoutes";
import { commercialRentalPropertiesRoutes } from "@/src/BackendRoutes/Properties/Commercial/CommercialRentalPropertiesRoutes";
import { residentialRentalPropertiesRoutes } from "@/src/BackendRoutes/Properties/Residential/ResidentialRentalPropertiesRoutes";
import { residentialPropertiesForSaleRoutes } from "@/src/BackendRoutes/Properties/Residential/ResidentialPropertiesForSaleRoutes";
import { standRoutes } from "@/src/BackendRoutes/Properties/Stand/StandRoutes";
import { landRoutes } from "@/src/BackendRoutes/Properties/Land/LandRoutes";
import { propertyInsightsRoutes } from "@/src/BackendRoutes/Properties/Insights/PropertyInsightsRoutes";
import { propertyLocationRoutes } from "@/src/BackendRoutes/Properties/Location/PropertyLocationRoutes";
import { propertyMediaRoutes } from "@/src/BackendRoutes/Properties/Media/PropertyMediaRoutes";
import { reportRoutes } from "@/src/BackendRoutes/Properties/Report/ReportRoutes";
import {
  IResidentialRentalProperty,
  IResidentialRentalPropertyWithManager,
} from "@/src/GlobalTypes/Property/Residential/RentalTypes";
import { ICommercialPropertyForSale } from "@/src/GlobalTypes/Property/Commercial/ForSaleTypes";
import { ICommercialRentalProperty } from "@/src/GlobalTypes/Property/Commercial/RentalTypes";
import { IResidentialPropertyForSale } from "@/src/GlobalTypes/Property/Residential/ForSaleTypes";
import { IStandProperty } from "@/src/GlobalTypes/Property/Stand/StandTypes";
import { ILandProperty } from "@/src/GlobalTypes/Property/Land/LandTypes";

const controller = new AbortController();

export const getCommercialPropertyForSaleHttpFunc = (requestData: {
  propertyId: number;
}) => {
  return axios.get<{ response: ICommercialPropertyForSale }>(
    `${commercialPropertiesForSaleRoutes.getUpdateAndDeleteCommercialPropertyForSale}/${requestData.propertyId}`
  );
};

export const getAllCommercialPropertiesForSaleHttpFunc = (requestData: {
  page: number;
  pageLimit: number;
  isUserLoggedIn: boolean;
  accessToken: string;
}) => {
  return axios.get<{
    properties: ICommercialPropertyForSale[];
    totalPages: number;
    count: number;
  }>(
    requestData.isUserLoggedIn
      ? `${commercialPropertiesForSaleRoutes.getAllCommercialForSaleProperties}/logged-in?page=${requestData.page}&pageLimit=${requestData.pageLimit}`
      : `${commercialPropertiesForSaleRoutes.getAllCommercialForSaleProperties}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
    {
      signal: controller.signal,
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getCommercialRentalPropertyHttpFunc = (requestData: {
  propertyId: number;
}) => {
  return axios.get<{
    response: ICommercialRentalProperty;
  }>(
    `${commercialRentalPropertiesRoutes.getUpdateAndDeleteCommercialRentalProperty}/${requestData.propertyId}`
  );
};

export const getAllCommercialRentalPropertiesHttpFunc = (requestData: {
  page: number;
  pageLimit: number;
  isUserLoggedIn: boolean;
  accessToken: string;
}) => {
  return axios.get<{
    properties: ICommercialRentalProperty[];
    totalPages: number;
    count: number;
  }>(
    requestData.isUserLoggedIn
      ? `${commercialRentalPropertiesRoutes.getAllCommercialRentalProperties}/logged-in?page=${requestData.page}&pageLimit=${requestData.pageLimit}`
      : `${commercialRentalPropertiesRoutes.getAllCommercialRentalProperties}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
    {
      signal: controller.signal,
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    },
  );
};

export const getResidentialRentalPropertyHttpFunc = (requestData: {
  propertyId: number;
}) => {
  return axios.get<{ response: IResidentialRentalProperty }>(
    `${residentialRentalPropertiesRoutes.getUpdateAndDeleteResidentialRentalProperty}/${requestData.propertyId}`
  );
};

export const getAllResidentialRentalPropertiesHttpFunc = (requestData: {
  page: number;
  pageLimit: number;
  isUserLoggedIn: boolean;
  accessToken: string;
}) => {
  return axios.get<{
    properties: IResidentialRentalPropertyWithManager[];
    totalPages: number;
    count: number;
  }>(
    requestData.isUserLoggedIn
      ? `${residentialRentalPropertiesRoutes.getAllResidentialRentalProperties}/logged-in?page=${requestData.page}&pageLimit=${requestData.pageLimit}`
      : `${residentialRentalPropertiesRoutes.getAllResidentialRentalProperties}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
    {
      signal: controller.signal,
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getResidentialPropertyForSaleHttpFunc = (requestData: {
  propertyId: number;
}) => {
  return axios.get<{
    response: IResidentialPropertyForSale;
  }>(
    `${residentialPropertiesForSaleRoutes.getUpdateAndDeleteResidentialPropertyForSale}/${requestData.propertyId}`
  );
};

export const getAllResidentialPropertiesForSaleHttpFunc = (requestData: {
  page: number;
  pageLimit: number;
  isUserLoggedIn: boolean;
  accessToken: string;
}) => {
  return axios.get<{
    properties: IResidentialPropertyForSale[];
    totalPages: number;
    count: number;
  }>(
    requestData.isUserLoggedIn
    ? `${residentialPropertiesForSaleRoutes.getAllResidentialForSaleProperties}/logged-in?page=${requestData.page}&pageLimit=${requestData.pageLimit}`
    : `${residentialPropertiesForSaleRoutes.getAllResidentialForSaleProperties}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
  {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${requestData.accessToken}` },
  }
  );
};

export const getStandPropertyHttpFunc = (requestData: {
  propertyId: number;
}) => {
  return axios.get<{ response: IStandProperty }>(
    `${standRoutes.getAllGetOnePostDeleteAndUpdateStand}/${requestData.propertyId}`
  );
};

export const getAllStandsHttpFunc = (requestData: {
  page: number;
  pageLimit: number;
  isUserLoggedIn: boolean;
  accessToken: string;
}) => {
  return axios.get<{
    properties: IStandProperty[];
    totalPages: number;
    count: number;
  }>(
    requestData.isUserLoggedIn
    ? `${standRoutes.getAllGetOnePostDeleteAndUpdateStand}/logged-in?page=${requestData.page}&pageLimit=${requestData.pageLimit}`
    : `${standRoutes.getAllGetOnePostDeleteAndUpdateStand}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
  {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${requestData.accessToken}` },
  }
  );
};

export const getLandPropertyHttpFunc = (requestData: {
  propertyId: number;
}) => {
  return axios.get<{ response: ILandProperty }>(
    `${landRoutes.getAllGetOnePostDeleteAndUpdateLand}/${requestData.propertyId}`
  );
};

export const getAllLandPropertiesHttpFunc = (requestData: {
  page: number;
  pageLimit: number;
  isUserLoggedIn: boolean;
  accessToken: string;
}) => {
  return axios.get<{
    properties: ICommercialPropertyForSale[];
    totalPages: number;
    count: number;
  }>(
    requestData.isUserLoggedIn
    ? `${landRoutes.getAllGetOnePostDeleteAndUpdateLand}/logged-in?page=${requestData.page}&pageLimit=${requestData.pageLimit}`
    : `${landRoutes.getAllGetOnePostDeleteAndUpdateLand}?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
  {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${requestData.accessToken}` },
  }
  );
};

export const getPropertyInsightsByPropertyIdHttpFunc = (requestData: {
  propertyId: number;
  accessToken: string;
}) => {
  return axios.get(
    `${propertyInsightsRoutes.getPropertyInsightsByPropertyId}/${requestData.propertyId}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getPropertyInsightsByIdHttpFunc = (requestData: {
  insightId: number;
  accessToken: string;
}) => {
  return axios.get(
    `${propertyInsightsRoutes.getPropertyInsightsByPropertyId}/${requestData.insightId}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getPropertyLocationHttpFunc = (requestData: {
  locationId: number;
  accessToken: string;
}) => {
  return axios.get(
    `${propertyLocationRoutes.getAndUpdatePropertyLocation}/${requestData.locationId}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getPropertyImageOrVideoHttpFunc = (requestData: {
  imageOrVideoId: number;
  accessToken: string;
}) => {
  return axios.get(
    `${propertyMediaRoutes.postGetDeleteAndUpdatePropertyMedia}/${requestData.imageOrVideoId}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getPropertyReportyByIdHttpFunc = (requestData: {
  reportId: number;
  accessToken: string;
}) => {
  return axios.get(
    `${reportRoutes.getAllGetOnePostDeleteAndUpdateReport}/${requestData.reportId}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getPropertyReportyByPropertyIdHttpFunc = (requestData: {
  propertyId: number;
  accessToken: string;
}) => {
  return axios.get(
    `${reportRoutes.getReportsByPropertyId}/${requestData.propertyId}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getPropertyReportyByManagerIdHttpFunc = (requestData: {
  managerId: number;
  accessToken: string;
}) => {
  return axios.get(
    `${reportRoutes.getReportsByManagerId}/${requestData.managerId}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};
