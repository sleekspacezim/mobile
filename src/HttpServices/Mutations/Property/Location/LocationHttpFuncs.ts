import axios from "axios";

import { IPropertyLocation } from "@/src/GlobalTypes/Property/Location/LocationTypes";
import { propertyLocationRoutes } from "@/src/BackendRoutes/Properties/Location/PropertyLocationRoutes";

export const updatePropertyLocationHttpFunc = (requestData: {
  location: IPropertyLocation;
  accessToken: string;
}) => {
  return axios.put(
    `${propertyLocationRoutes.getAndUpdatePropertyLocation}/${requestData.location.id}`,
    requestData.location,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};
