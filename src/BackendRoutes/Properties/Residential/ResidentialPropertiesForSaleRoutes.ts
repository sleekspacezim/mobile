import { backEndUrl } from "../../../Utils/Constants";

const baseRouteName = "/property/residential/onsale";

export const residentialPropertiesForSaleRoutes = {
  postResidentialPropertyForSale: `${backEndUrl}${baseRouteName}`,
  getAllResidentialForSaleProperties: `${backEndUrl}${baseRouteName}`,
  getUpdateAndDeleteResidentialPropertyForSale: `${backEndUrl}${baseRouteName}`,
};