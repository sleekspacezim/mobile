import axios from "axios";

import { commercialPropertiesForSaleRoutes } from "@/src/BackendRoutes/Properties/Commercial/CommercialForSalePropertiesRoutes";
import {
  ICommercialPropertyForSaleCreation,
  ICommercialPropertyForSaleUpdate,
} from "@/src/GlobalTypes/Property/Commercial/ForSaleTypes";

export const postCommercialPropertyForSaleHttpFunc = (requestData: {
  property: ICommercialPropertyForSaleCreation;
  accessToken: string;
}) => {
  return axios.post(
    `${commercialPropertiesForSaleRoutes.postCommercialPropertyForSale}`,
    requestData.property,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const updateCommercialPropertyForSaleHttpFunc = (requestData: {
  property: ICommercialPropertyForSaleUpdate;
  accessToken: string;
}) => {
  return axios.put(
    `${commercialPropertiesForSaleRoutes.getUpdateAndDeleteCommercialPropertyForSale}/${requestData.property.id}`,
    requestData.property,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const deleteCommercialPropertyForSaleHttpFunc = (requestData: {
    propertyId: number;
    accessToken: string;
  }) => {
    return axios.delete(
      `${commercialPropertiesForSaleRoutes.getUpdateAndDeleteCommercialPropertyForSale}/${requestData.propertyId}`,
      {
        headers: { Authorization: `Bearer ${requestData.accessToken}` },
      }
    );
  };
