import axios from "axios";

import { commercialRentalPropertiesRoutes } from "@/src/BackendRoutes/Properties/Commercial/CommercialRentalPropertiesRoutes";
import {
  ICommercialRentalPropertyCreation,
  ICommercialRentalPropertyUpdate,
} from "@/src/GlobalTypes/Property/Commercial/RentalTypes";

export const postCommercialRentalPropertyHttpFunc = (requestData: {
  property: ICommercialRentalPropertyCreation;
  accessToken: string;
}) => {
  return axios.post(
    `${commercialRentalPropertiesRoutes.postCommercialRentalProperty}`,
    requestData.property,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const updateCommercialRentalPropertyHttpFunc = (requestData: {
  property: ICommercialRentalPropertyUpdate;
  accessToken: string;
}) => {
  return axios.put(
    `${commercialRentalPropertiesRoutes.getUpdateAndDeleteCommercialRentalProperty}/${requestData.property.id}`,
    requestData.property,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const deleteCommercialRentalPropertyHttpFunc = (requestData: {
  propertyId: number;
  accessToken: string;
}) => {
  return axios.delete(
    `${commercialRentalPropertiesRoutes.getUpdateAndDeleteCommercialRentalProperty}/${requestData.propertyId}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};
