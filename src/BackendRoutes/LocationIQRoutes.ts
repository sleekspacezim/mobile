import { backEndUrl } from "../Utils/Constants";

const baseRouteName = "/locationIQ";

export const locationIQRoutes = {
  locationAutoComplete: `${backEndUrl}${baseRouteName}/autocomplete`,
  locationReverseGeoCoding: `${backEndUrl}${baseRouteName}/reverse-geocoding`,
};
