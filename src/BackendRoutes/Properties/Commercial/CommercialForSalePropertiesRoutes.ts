import { backEndUrl } from "../../../Utils/Constants";

const baseRouteName = "/property/commercial/onsale";

export const commercialPropertiesForSaleRoutes = {
  postCommercialPropertyForSale: `${backEndUrl}${baseRouteName}`,
  getAllCommercialForSaleProperties: `${backEndUrl}${baseRouteName}`,
  getUpdateAndDeleteCommercialPropertyForSale: `${backEndUrl}${baseRouteName}`,
};
