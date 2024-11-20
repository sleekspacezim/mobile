import axios from "axios";

import { reportRoutes } from "@/src/BackendRoutes/Properties/Report/ReportRoutes";
import {
  IPropertyReportCreation,
  IPropertyReportReponseOrUpdate,
} from "@/src/GlobalTypes/Property/Reports/ReportsTypes";

export const postPropertyReportHttpFunc = (requestData: {
  report: IPropertyReportCreation;
  accessToken: string;
}) => {
  return axios.post(
    `${reportRoutes.getAllGetOnePostDeleteAndUpdateReport}`,
    requestData.report,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const updatePropertyReportHttpFunc = (requestData: {
  report: IPropertyReportReponseOrUpdate;
  accessToken: string;
}) => {
  return axios.put(
    `${reportRoutes.getAllGetOnePostDeleteAndUpdateReport}/${requestData.report.id}`,
    requestData.report,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const deletePropertyReportHttpFunc = (requestData: {
  reportId: number;
  accessToken: string;
}) => {
  return axios.delete(
    `${reportRoutes.getAllGetOnePostDeleteAndUpdateReport}/${requestData.reportId}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};
