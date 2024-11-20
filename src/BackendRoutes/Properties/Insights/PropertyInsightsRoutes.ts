import { backEndUrl } from "../../../Utils/Constants";

const baseRouteName = "/property/insights";

export const propertyInsightsRoutes = {
  getAndUpdatePropertyInsights: `${backEndUrl}${baseRouteName}`,
  getPropertyInsightsByPropertyId: `${backEndUrl}${baseRouteName}/property`,
};
