import { backEndUrl } from "../Utils/Constants";

const baseRouteName = "/manager";

export const managerRoutes = {
  getManagerAccountByUserId: `${backEndUrl}${baseRouteName}/user/`,
  postDeleteAndGetManagerAccountById: `${backEndUrl}${baseRouteName}`,
  getManagerStandsByManagerId: `${backEndUrl}${baseRouteName}/stands`,
  getManagerLandPropertiesByManagerId: `${backEndUrl}${baseRouteName}/lands`,
  getManagerCommercialRentalPropertiesByManagerId: `${backEndUrl}${baseRouteName}/commercial/rentals`,
  getManagerCommercialPropertiesForSaleByManagerId: `${backEndUrl}${baseRouteName}/commercial/onsale`,
  getManagerResidentialRentalPropertiesByManagerId: `${backEndUrl}${baseRouteName}/residential/rentals`,
  getManagerResidentialPropertiesForSaleByManagerId: `${backEndUrl}${baseRouteName}/residential/onsale`,
  updateManagerContactNumbers: `${backEndUrl}${baseRouteName}/contacts`,
  updateManagerProfilePicture: `${backEndUrl}${baseRouteName}/profile-picture`,
  removeManagerProfilePicture: `${backEndUrl}${baseRouteName}/profile-picture/remove`,
};
