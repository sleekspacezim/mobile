import { backEndUrl } from "@/src/Utils/Constants";


const baseRouteName = "/property/report";

export const reportRoutes = {
  getAllGetOnePostDeleteAndUpdateReport: `${backEndUrl}${baseRouteName}`,
  getReportsByPropertyId: `${backEndUrl}${baseRouteName}/property`,
  getReportsByManagerId: `${backEndUrl}${baseRouteName}/manager`,
};