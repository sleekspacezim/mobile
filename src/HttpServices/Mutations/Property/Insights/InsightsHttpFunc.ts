import axios from "axios";

import { propertyInsightsRoutes } from "@/src/BackendRoutes/Properties/Insights/PropertyInsightsRoutes";
import { IPropertyInsights } from "@/src/GlobalTypes/Property/Insights/InsightsTypes";

export const updatePropertyInsightsHttpFunc = (requestData: {
  insights: IPropertyInsights;
  accessToken: string;
}) => {
  return axios.put(
    `${propertyInsightsRoutes.getAndUpdatePropertyInsights}/${requestData.insights.id}`,
    requestData.insights,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};
