import axios from "axios";

import {
  IResidentialRentalPropertyCreation,
  IResidentialRentalPropertyUpdate,
} from "@/src/GlobalTypes/Property/Residential/RentalTypes";
import { residentialRentalPropertiesRoutes } from "@/src/BackendRoutes/Properties/Residential/ResidentialRentalPropertiesRoutes";

export const postResidentialRentalPropertyHttpFunc = (requestData: {
  property: IResidentialRentalPropertyCreation;
  accessToken: string;
}) => {
  return axios.post(
    `${residentialRentalPropertiesRoutes.postResidentialRentalProperty}`,
    requestData.property,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const updateResidentialRentalPropertyHttpFunc = (requestData: {
  property: IResidentialRentalPropertyUpdate;
  accessToken: string;
}) => {
  return axios.put(
    `${residentialRentalPropertiesRoutes.getUpdateAndDeleteResidentialRentalProperty}/${requestData.property.id}`,
    requestData.property,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const deleteResidentialRentalPropertyHttpFunc = (requestData: {
  propertyId: number;
  accessToken: string;
}) => {
  return axios.delete(
    `${residentialRentalPropertiesRoutes.getUpdateAndDeleteResidentialRentalProperty}/${requestData.propertyId}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};
