import axios from "axios";

import { managerRoutes } from "@/src/BackendRoutes/ManagerRoutes";
import { IUser } from "@/src/GlobalTypes/User/UserTypes";

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
}) => {
  return axios.get(
    managerRoutes.getManagerStandsByManagerId + "/" + requestData.managerId,
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
}) => {
  return axios.get(
    managerRoutes.getManagerLandPropertiesByManagerId +
      "/" +
      requestData.managerId,
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
}) => {
  return axios.get(
    managerRoutes.getManagerResidentialRentalPropertiesByManagerId +
      "/" +
      requestData.managerId,
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
}) => {
  return axios.get(
    managerRoutes.getManagerResidentialPropertiesForSaleByManagerId +
      "/" +
      requestData.managerId,
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
}) => {
  return axios.get(
    managerRoutes.getManagerCommercialPropertiesForSaleByManagerId +
      "/" +
      requestData.managerId,
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
}) => {
  return axios.get(
    managerRoutes.getManagerCommercialRentalPropertiesByManagerId +
      "/" +
      requestData.managerId,
    {
      headers: {
        Authorization: `Bearer ${requestData.accessToken}`,
      },
    }
  );
};
