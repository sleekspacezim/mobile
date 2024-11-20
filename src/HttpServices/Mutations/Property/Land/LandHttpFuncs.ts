import axios from "axios";

import {
  ILandPropertyCreation,
  ILandPropertyUpdate,
} from "@/src/GlobalTypes/Property/Land/LandTypes";
import { landRoutes } from "@/src/BackendRoutes/Properties/Land/LandRoutes";

export const postLandHttpFunc = (requestData: {
  property: ILandPropertyCreation;
  accessToken: string;
}) => {
  return axios.post(
    `${landRoutes.getAllGetOnePostDeleteAndUpdateLand}`,
    requestData.property,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const updateLandHttpFunc = (requestData: {
  property: ILandPropertyUpdate;
  accessToken: string;
}) => {
  return axios.put(
    `${landRoutes.getAllGetOnePostDeleteAndUpdateLand}/${requestData.property.id}`,
    requestData.property,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const deleteLandHttpFunc = (requestData: {
  propertyId: number;
  accessToken: string;
}) => {
  return axios.delete(
    `${landRoutes.getAllGetOnePostDeleteAndUpdateLand}/${requestData.propertyId}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};
