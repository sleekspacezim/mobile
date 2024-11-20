import { backEndUrl } from "../../../Utils/Constants";

const baseRouteName = "/property/commercial/rentals";

export const commercialRentalPropertiesRoutes = {
  postCommercialRentalProperty: `${backEndUrl}${baseRouteName}`,
  getAllCommercialRentalProperties: `${backEndUrl}${baseRouteName}`,
  getUpdateAndDeleteCommercialRentalProperty: `${backEndUrl}${baseRouteName}`,
};