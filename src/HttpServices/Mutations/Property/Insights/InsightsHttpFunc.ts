import axios from "axios";

import { propertyInsightsRoutes } from "@/src/BackendRoutes/Properties/Insights/PropertyInsightsRoutes";
import {
  IPropertyInsights,
  IPropertyInsightsTypes,
} from "@/src/GlobalTypes/Property/Insights/InsightsTypes";

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

export const updateAndIncreamentPropertyInsightsByPropertyIdHttpFunc =
  (requestData: {
    propertyId: number;
    data: { insightProperty: IPropertyInsightsTypes };
  }) => {
    return axios.put<{ response: boolean }>(
      `${propertyInsightsRoutes.getPropertyInsightsByPropertyId}/${requestData.propertyId}`,
      requestData.data
    );
  };
