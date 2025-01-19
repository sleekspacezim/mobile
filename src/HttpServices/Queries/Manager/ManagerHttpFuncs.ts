import axios from "axios";

import { managerRoutes } from "@/src/BackendRoutes/ManagerRoutes";
import { IUser } from "@/src/GlobalTypes/User/UserTypes";
import { IResidentialRentalPropertyWithManager } from "@/src/GlobalTypes/Property/Residential/RentalTypes";
import { IStandPropertyWithManager } from "@/src/GlobalTypes/Property/Stand/StandTypes";
import { ILandPropertyWithManager } from "@/src/GlobalTypes/Property/Land/LandTypes";
import { IResidentialPropertyForSaleWithManager } from "@/src/GlobalTypes/Property/Residential/ForSaleTypes";
import { ICommercialPropertyForSaleWithManager } from "@/src/GlobalTypes/Property/Commercial/ForSaleTypes";
import { ICommercialRentalPropertyWithManager } from "@/src/GlobalTypes/Property/Commercial/RentalTypes";

export const getManagerByUserId = (user: IUser) => {
  return axios.get(managerRoutes.getManagerAccountByUserId + user.id, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
};

export const getManagerById = (requestData: {
  accessToken: string;
  managerId: number;
}) => {
  return axios.get(
    managerRoutes.postDeleteAndGetManagerAccountById +
      "/" +
      requestData.managerId,
    {
      headers: {
        Authorization: `Bearer ${requestData.accessToken}`,
      },
    }
  );
};

export const getManagerStands = (requestData: {
  accessToken: string;
  managerId: number;
  page: number;
  pageLimit: number;
}) => {
  return axios.get<{
    properties: IStandPropertyWithManager[];
    totalPages: number;
    count: number;
  }>(
    managerRoutes.getManagerStandsByManagerId +
      "/" +
      requestData.managerId +
      `?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
    {
      headers: {
        Authorization: `Bearer ${requestData.accessToken}`,
      },
    }
  );
};

export const getManagerLandProperties = (requestData: {
  accessToken: string;
  managerId: number;
  page: number;
  pageLimit: number;
}) => {
  return axios.get<{
    properties: ILandPropertyWithManager[];
    totalPages: number;
    count: number;
  }>(
    managerRoutes.getManagerLandPropertiesByManagerId +
      "/" +
      requestData.managerId +
      `?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
    {
      headers: {
        Authorization: `Bearer ${requestData.accessToken}`,
      },
    }
  );
};

export const getManagerResidentialRentalProperties = (requestData: {
  accessToken: string;
  managerId: number;
  page: number;
  pageLimit: number;
}) => {
  return axios.get<{
    properties: IResidentialRentalPropertyWithManager[];
    totalPages: number;
    count: number;
  }>(
    managerRoutes.getManagerResidentialRentalPropertiesByManagerId +
      "/" +
      requestData.managerId +
      `?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
    {
      headers: {
        Authorization: `Bearer ${requestData.accessToken}`,
      },
    }
  );
};

export const getManagerResidentialForSaleProperties = (requestData: {
  accessToken: string;
  managerId: number;
  page: number;
  pageLimit: number;
}) => {
  return axios.get<{
    properties: IResidentialPropertyForSaleWithManager[];
    totalPages: number;
    count: number;
  }>(
    managerRoutes.getManagerResidentialPropertiesForSaleByManagerId +
      "/" +
      requestData.managerId +
      `?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
    {
      headers: {
        Authorization: `Bearer ${requestData.accessToken}`,
      },
    }
  );
};

export const getManagerCommercialPropertiesForSale = (requestData: {
  accessToken: string;
  managerId: number;
  page: number;
  pageLimit: number;
}) => {
  return axios.get<{
    properties: ICommercialPropertyForSaleWithManager[];
    totalPages: number;
    count: number;
  }>(
    managerRoutes.getManagerCommercialPropertiesForSaleByManagerId +
      "/" +
      requestData.managerId +
      `?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
    {
      headers: {
        Authorization: `Bearer ${requestData.accessToken}`,
      },
    }
  );
};

export const getManagerCommercialRentalProperties = (requestData: {
  accessToken: string;
  managerId: number;
  page: number;
  pageLimit: number;
}) => {
  return axios.get<{
    properties: ICommercialRentalPropertyWithManager[];
    totalPages: number;
    count: number;
  }>(
    managerRoutes.getManagerCommercialRentalPropertiesByManagerId +
      "/" +
      requestData.managerId +
      `?page=${requestData.page}&pageLimit=${requestData.pageLimit}`,
    {
      headers: {
        Authorization: `Bearer ${requestData.accessToken}`,
      },
    }
  );
};
