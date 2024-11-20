import { backEndUrl } from "@/src/Utils/Constants";

const baseRouteName = "/property/residential/rentals";

export const residentialRentalPropertiesRoutes = {
  postResidentialRentalProperty: `${backEndUrl}${baseRouteName}`,
  getAllResidentialRentalProperties: `${backEndUrl}${baseRouteName}`,
  getUpdateAndDeleteResidentialRentalProperty: `${backEndUrl}${baseRouteName}`,
};