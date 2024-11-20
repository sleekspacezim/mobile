import axios from "axios";

import { userRoutes } from "@/src/BackendRoutes/UserRoutes";
import { IUserLocation } from "@/src/GlobalTypes/User/UserTypes";

export const updateUserLocationHttpFunc = (
  locationData: {
    location:IUserLocation,
    accessToken:string
  }
) => {
  return axios.put(`${userRoutes.getAndUpdateUserLocation}`, locationData.location, {
    headers: { Authorization: `Bearer ${locationData.accessToken}` },
  });
};

export const createUserLocationHttpFunc = (
  locationData: {
    location:IUserLocation,
    accessToken:string
  }
) => {
  return axios.post(`${userRoutes.getAndUpdateUserLocation}`, locationData.location, {
    headers: { Authorization: `Bearer ${locationData.accessToken}` },
  });
};
