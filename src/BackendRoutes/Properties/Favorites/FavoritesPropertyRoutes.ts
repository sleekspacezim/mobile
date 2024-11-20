import { backEndUrl } from "@/src/Utils/Constants";

const baseRouteName = "/favorites/property";

export const favoritePropertyRoutes = {
  getAndUpdateFavoriteLandProperties: `${backEndUrl}${baseRouteName}/land`,
  getAndUpdateFavoriteStandProperties: `${backEndUrl}${baseRouteName}/stand`,
  getAndUpdateFavoriteCommercialForSaleProperties: `${backEndUrl}${baseRouteName}/commercial/onsale`,
  getAndUpdateFavoriteCommercialRentalProperties: `${backEndUrl}${baseRouteName}/commercial/rentals`,
  getAndUpdateFavoriteResidentialForSaleProperties: `${backEndUrl}${baseRouteName}/residential/onsale`,
  getAndUpdateFavoriteResidentialRentalProperties: `${backEndUrl}${baseRouteName}/residential/rentals`,
};
