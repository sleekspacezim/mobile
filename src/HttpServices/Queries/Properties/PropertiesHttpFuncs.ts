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
import {
  ICommercialPropertyForSale,
  ICommercialPropertyForSaleWithManager,
} from "@/src/GlobalTypes/Property/Commercial/ForSaleTypes";
import {
  ICommercialRentalProperty,
  ICommercialRentalPropertyWithManager,
} from "@/src/GlobalTypes/Property/Commercial/RentalTypes";
import {
  IResidentialPropertyForSale,
  IResidentialPropertyForSaleWithManager,
} from "@/src/GlobalTypes/Property/Residential/ForSaleTypes";
import {
  IStandProperty,
  IStandPropertyWithManager,
} from "@/src/GlobalTypes/Property/Stand/StandTypes";
import {
  ILandProperty,
  ILandPropertyWithManager,
} from "@/src/GlobalTypes/Property/Land/LandTypes";
import {
  ISortCommercialForSalePropertiesOptions,
  ISortCommercialRentalPropertiesOptions,
  ISortLandOptions,
  ISortResidentialForSalePropertiesOptions,
  ISortResidentialRentalPropertiesOptions,
  ISortStandOptions,
} from "@/src/Context/SortPropertiesContext";
import { ICurrency, IDimensions } from "@/src/GlobalTypes/Property/Common";
import { IPropertyInsights } from "@/src/GlobalTypes/Property/Insights/InsightsTypes";

const controller = new AbortController();

export const getCommercialPropertyForSaleHttpFunc = (requestData: {
  propertyId: number;
  isUserLoggedIn: boolean;
  accessToken: string;
}) => {
  return axios.get<{ response: ICommercialPropertyForSaleWithManager }>(
    requestData.isUserLoggedIn
      ? `${commercialPropertiesForSaleRoutes.getUpdateAndDeleteCommercialPropertyForSale}/logged-in/${requestData.propertyId}`
      : `${commercialPropertiesForSaleRoutes.getUpdateAndDeleteCommercialPropertyForSale}/${requestData.propertyId}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getAllCommercialPropertiesForSaleHttpFunc = (requestData: {
  page: number;
  pageLimit: number;
  isUserLoggedIn: boolean;
  accessToken: string;
  sortBy: ISortCommercialForSalePropertiesOptions;
  priceMin: number;
  priceMax: number;
  type: string;
  currency: ICurrency | "";
  sizeNumber: string;
  sizeDimension: IDimensions | "";
  numberOfRooms: string;
}) => {
  return axios.get<{
    properties: ICommercialPropertyForSaleWithManager[];
    totalPages: number;
    count: number;
  }>(
    requestData.isUserLoggedIn
      ? `${commercialPropertiesForSaleRoutes.getAllCommercialForSaleProperties}/logged-in?page=${requestData.page}&pageLimit=${requestData.pageLimit}&sortBy=${requestData.sortBy}&currency=${requestData.currency}&type=${requestData.type}&price_min=${requestData.priceMin}&price_max=${requestData.priceMax}&size_number=${requestData.sizeNumber}&size_dimensions=${requestData.sizeDimension}&number_of_rooms=${requestData.numberOfRooms}`
      : `${commercialPropertiesForSaleRoutes.getAllCommercialForSaleProperties}?page=${requestData.page}&pageLimit=${requestData.pageLimit}&sortBy=${requestData.sortBy}&currency=${requestData.currency}&type=${requestData.type}&price_min=${requestData.priceMin}&price_max=${requestData.priceMax}&size_number=${requestData.sizeNumber}&size_dimensions=${requestData.sizeDimension}&number_of_rooms=${requestData.numberOfRooms}`,
    {
      signal: controller.signal,
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getCommercialRentalPropertyHttpFunc = (requestData: {
  propertyId: number;
  isUserLoggedIn: boolean;
  accessToken: string;
}) => {
  return axios.get<{
    response: ICommercialRentalPropertyWithManager;
  }>(
    requestData.isUserLoggedIn
      ? `${commercialRentalPropertiesRoutes.getUpdateAndDeleteCommercialRentalProperty}/logged-in/${requestData.propertyId}`
      : `${commercialRentalPropertiesRoutes.getUpdateAndDeleteCommercialRentalProperty}/${requestData.propertyId}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getAllCommercialRentalPropertiesHttpFunc = (requestData: {
  page: number;
  pageLimit: number;
  isUserLoggedIn: boolean;
  accessToken: string;
  sortBy: ISortCommercialRentalPropertiesOptions;
  rentMin: number;
  rentMax: number;
  type: string;
  currency: ICurrency | "";
  sizeNumber: string;
  sizeDimension: IDimensions | "";
  numberOfRooms: string;
  roomsToRent: string;
}) => {
  return axios.get<{
    properties: ICommercialRentalPropertyWithManager[];
    totalPages: number;
    count: number;
  }>(
    requestData.isUserLoggedIn
      ? `${commercialRentalPropertiesRoutes.getAllCommercialRentalProperties}/logged-in?page=${requestData.page}&pageLimit=${requestData.pageLimit}&sortBy=${requestData.sortBy}&currency=${requestData.currency}&type=${requestData.type}&rent_min=${requestData.rentMin}&rent_max=${requestData.rentMax}&size_number=${requestData.sizeNumber}&size_dimensions=${requestData.sizeDimension}&number_of_rooms=${requestData.numberOfRooms}&number_of_rooms_to_rent=${requestData.roomsToRent}`
      : `${commercialRentalPropertiesRoutes.getAllCommercialRentalProperties}?page=${requestData.page}&pageLimit=${requestData.pageLimit}&sortBy=${requestData.sortBy}&currency=${requestData.currency}&type=${requestData.type}&rent_min=${requestData.rentMin}&rent_max=${requestData.rentMax}&size_number=${requestData.sizeNumber}&size_dimensions=${requestData.sizeDimension}&number_of_rooms=${requestData.numberOfRooms}&number_of_rooms_to_rent=${requestData.roomsToRent}`,
    {
      signal: controller.signal,
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getResidentialRentalPropertyHttpFunc = (requestData: {
  propertyId: number;
  isUserLoggedIn: boolean;
  accessToken: string;
}) => {
  return axios.get<{ response: IResidentialRentalPropertyWithManager }>(
    requestData.isUserLoggedIn
      ? `${residentialRentalPropertiesRoutes.getUpdateAndDeleteResidentialRentalProperty}/logged-in/${requestData.propertyId}`
      : `${residentialRentalPropertiesRoutes.getUpdateAndDeleteResidentialRentalProperty}/${requestData.propertyId}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getAllResidentialRentalPropertiesHttpFunc = (requestData: {
  page: number;
  pageLimit: number;
  isUserLoggedIn: boolean;
  accessToken: string;
  sortBy: ISortResidentialRentalPropertiesOptions;
  rentMin: number;
  rentMax: number;
  type: string;
  currency: ICurrency | "";
  sizeNumber: string;
  sizeDimension: IDimensions | "";
  bedrooms: string;
  bathroom: string;
  numberOfRooms: string;
  roomsToRent: string;
}) => {
  return axios.get<{
    properties: IResidentialRentalPropertyWithManager[];
    totalPages: number;
    count: number;
  }>(
    requestData.isUserLoggedIn
      ? `${residentialRentalPropertiesRoutes.getAllResidentialRentalProperties}/logged-in?page=${requestData.page}&pageLimit=${requestData.pageLimit}&sortBy=${requestData.sortBy}&currency=${requestData.currency}&type=${requestData.type}&rent_min=${requestData.rentMin}&rent_max=${requestData.rentMax}&bedrooms=${requestData.bedrooms}&bathrooms=${requestData.bathroom}&size_number=${requestData.sizeNumber}&size_dimensions=${requestData.sizeDimension}&number_of_rooms=${requestData.numberOfRooms}&number_of_rooms_to_rent=${requestData.roomsToRent}`
      : `${residentialRentalPropertiesRoutes.getAllResidentialRentalProperties}?page=${requestData.page}&pageLimit=${requestData.pageLimit}&sortBy=${requestData.sortBy}&currency=${requestData.currency}&type=${requestData.type}&rent_min=${requestData.rentMin}&rent_max=${requestData.rentMax}&bedrooms=${requestData.bedrooms}&bathrooms=${requestData.bathroom}&size_number=${requestData.sizeNumber}&size_dimensions=${requestData.sizeDimension}&number_of_rooms=${requestData.numberOfRooms}&number_of_rooms_to_rent=${requestData.roomsToRent}`,
    {
      signal: controller.signal,
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getResidentialPropertyForSaleHttpFunc = (requestData: {
  propertyId: number;
  isUserLoggedIn: boolean;
  accessToken: string;
}) => {
  return axios.get<{
    response: IResidentialPropertyForSaleWithManager;
  }>(
    requestData.isUserLoggedIn
      ? `${residentialPropertiesForSaleRoutes.getUpdateAndDeleteResidentialPropertyForSale}/logged-in/${requestData.propertyId}`
      : `${residentialPropertiesForSaleRoutes.getUpdateAndDeleteResidentialPropertyForSale}/${requestData.propertyId}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getAllResidentialPropertiesForSaleHttpFunc = (requestData: {
  page: number;
  pageLimit: number;
  isUserLoggedIn: boolean;
  accessToken: string;
  sortBy: ISortResidentialForSalePropertiesOptions;
  priceMin: number;
  priceMax: number;
  type: string;
  currency: ICurrency | "";
  sizeNumber: string;
  sizeDimension: IDimensions | "";
  bedrooms: string;
  bathroom: string;
  numberOfRooms: string;
}) => {
  return axios.get<{
    properties: IResidentialPropertyForSaleWithManager[];
    totalPages: number;
    count: number;
  }>(
    requestData.isUserLoggedIn
      ? `${residentialPropertiesForSaleRoutes.getAllResidentialForSaleProperties}/logged-in?page=${requestData.page}&pageLimit=${requestData.pageLimit}&sortBy=${requestData.sortBy}&currency=${requestData.currency}&type=${requestData.type}&price_min=${requestData.priceMin}&price_max=${requestData.priceMax}&bedrooms=${requestData.bedrooms}&bathrooms=${requestData.bathroom}&size_number=${requestData.sizeNumber}&size_dimensions=${requestData.sizeDimension}&number_of_rooms=${requestData.numberOfRooms}`
      : `${residentialPropertiesForSaleRoutes.getAllResidentialForSaleProperties}?page=${requestData.page}&pageLimit=${requestData.pageLimit}&sortBy=${requestData.sortBy}&currency=${requestData.currency}&type=${requestData.type}&price_min=${requestData.priceMin}&price_max=${requestData.priceMax}&bedrooms=${requestData.bedrooms}&bathrooms=${requestData.bathroom}&size_number=${requestData.sizeNumber}&size_dimensions=${requestData.sizeDimension}&number_of_rooms=${requestData.numberOfRooms}`,
    {
      signal: controller.signal,
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getStandPropertyHttpFunc = (requestData: {
  propertyId: number;
  isUserLoggedIn: boolean;
  accessToken: string;
}) => {
  return axios.get<{ response: IStandPropertyWithManager }>(
    requestData.isUserLoggedIn
      ? `${standRoutes.getAllGetOnePostDeleteAndUpdateStand}/logged-in/${requestData.propertyId}`
      : `${standRoutes.getAllGetOnePostDeleteAndUpdateStand}/${requestData.propertyId}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getAllStandsHttpFunc = (requestData: {
  page: number;
  pageLimit: number;
  isUserLoggedIn: boolean;
  accessToken: string;
  sortBy: ISortStandOptions;
  priceMin: number;
  priceMax: number;
  type: string;
  currency: ICurrency | "";
  sizeNumber: string;
  sizeDimension: IDimensions | "";
}) => {
  return axios.get<{
    properties: IStandPropertyWithManager[];
    totalPages: number;
    count: number;
  }>(
    requestData.isUserLoggedIn
      ? `${standRoutes.getAllGetOnePostDeleteAndUpdateStand}/logged-in?page=${requestData.page}&pageLimit=${requestData.pageLimit}&sortBy=${requestData.sortBy}&currency=${requestData.currency}&type=${requestData.type}&price_min=${requestData.priceMin}&price_max=${requestData.priceMax}&size_number=${requestData.sizeNumber}&size_dimensions=${requestData.sizeDimension}`
      : `${standRoutes.getAllGetOnePostDeleteAndUpdateStand}?page=${requestData.page}&pageLimit=${requestData.pageLimit}&sortBy=${requestData.sortBy}&currency=${requestData.currency}&type=${requestData.type}&price_min=${requestData.priceMin}&price_max=${requestData.priceMax}&size_number=${requestData.sizeNumber}&size_dimensions=${requestData.sizeDimension}`,
    {
      signal: controller.signal,
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getLandPropertyHttpFunc = (requestData: {
  propertyId: number;
  isUserLoggedIn: boolean;
  accessToken: string;
}) => {
  return axios.get<{ response: ILandPropertyWithManager }>(
    requestData.isUserLoggedIn
      ? `${landRoutes.getAllGetOnePostDeleteAndUpdateLand}/logged-in/${requestData.propertyId}`
      : `${landRoutes.getAllGetOnePostDeleteAndUpdateLand}/${requestData.propertyId}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getAllLandPropertiesHttpFunc = (requestData: {
  page: number;
  pageLimit: number;
  isUserLoggedIn: boolean;
  accessToken: string;
  sortBy: ISortLandOptions;
  priceMin: number;
  priceMax: number;
  type: string;
  currency: ICurrency | "";
  sizeNumber: string;
  sizeDimension: IDimensions | "";
}) => {
  return axios.get<{
    properties: ILandPropertyWithManager[];
    totalPages: number;
    count: number;
  }>(
    requestData.isUserLoggedIn
      ? `${landRoutes.getAllGetOnePostDeleteAndUpdateLand}/logged-in?page=${requestData.page}&pageLimit=${requestData.pageLimit}&sortBy=${requestData.sortBy}&currency=${requestData.currency}&type=${requestData.type}&price_min=${requestData.priceMin}&price_max=${requestData.priceMax}&size_number=${requestData.sizeNumber}&size_dimensions=${requestData.sizeDimension}`
      : `${landRoutes.getAllGetOnePostDeleteAndUpdateLand}?page=${requestData.page}&pageLimit=${requestData.pageLimit}&sortBy=${requestData.sortBy}&currency=${requestData.currency}&type=${requestData.type}&price_min=${requestData.priceMin}&price_max=${requestData.priceMax}&size_number=${requestData.sizeNumber}&size_dimensions=${requestData.sizeDimension}`,
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
  return axios.get<{response:IPropertyInsights}>(
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
    `${propertyInsightsRoutes.getAndUpdatePropertyInsights}/${requestData.insightId}`,
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
