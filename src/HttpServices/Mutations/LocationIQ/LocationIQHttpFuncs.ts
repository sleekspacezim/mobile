import axios from "axios";

import { locationIQRoutes } from "@/src/BackendRoutes/LocationIQRoutes";

export const locationAutoCompleteHttpFunc = (location: {
  locationName: string;
}) => {
  return axios.post(`${locationIQRoutes.locationAutoComplete}`, location);
};

export const locationReverseGeoCodingHttpFunc = (coords: {
  lat: string;
  lon: string;
}) => {
  return axios.post(`${locationIQRoutes.locationReverseGeoCoding}`, coords);
};
