import axios from "axios";

import { residentialPropertiesForSaleRoutes } from "@/src/BackendRoutes/Properties/Residential/ResidentialPropertiesForSaleRoutes";
import {
  IResidentialPropertyForSaleCreation,
  IResidentialPropertyForSaleUpdate,
} from "@/src/GlobalTypes/Property/Residential/ForSaleTypes";

export const postResidentialPropertyForSaleHttpFunc = (requestData: {
  property: IResidentialPropertyForSaleCreation;
  accessToken: string;
}) => {
  return axios.post(
    `${residentialPropertiesForSaleRoutes.postResidentialPropertyForSale}`,
    requestData.property,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const updateResidentialPropertyForSaleHttpFunc = (requestData: {
  property: IResidentialPropertyForSaleUpdate;
  accessToken: string;
}) => {
  return axios.put(
    `${residentialPropertiesForSaleRoutes.getUpdateAndDeleteResidentialPropertyForSale}/${requestData.property.id}`,
    requestData.property,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const deleteResidentialPropertyForSaleHttpFunc = (requestData: {
  propertyId: number;
  accessToken: string;
}) => {
  return axios.delete(
    `${residentialPropertiesForSaleRoutes.getUpdateAndDeleteResidentialPropertyForSale}/${requestData.propertyId}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};
