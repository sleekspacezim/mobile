import axios from "axios";

import {
  IStandPropertyCreation,
  IStandPropertyUpdate,
} from "@/src/GlobalTypes/Property/Stand/StandTypes";
import { standRoutes } from "@/src/BackendRoutes/Properties/Stand/StandRoutes";

export const postStandHttpFunc = (requestData: {
  property: IStandPropertyCreation;
  accessToken: string;
}) => {
  return axios.post(
    `${standRoutes.getAllGetOnePostDeleteAndUpdateStand}`,
    requestData.property,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const updateStandHttpFunc = (requestData: {
  property: IStandPropertyUpdate;
  accessToken: string;
}) => {
  return axios.put(
    `${standRoutes.getAllGetOnePostDeleteAndUpdateStand}/${requestData.property.id}`,
    requestData.property,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const deleteStandHttpFunc = (requestData: {
  propertyId: number;
  accessToken: string;
}) => {
  return axios.delete(
    `${standRoutes.getAllGetOnePostDeleteAndUpdateStand}/${requestData.propertyId}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};
