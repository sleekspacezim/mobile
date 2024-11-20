export type IPropertyReportReponseOrUpdate = {
  id: number;
  propertyId: number;
  managerId: number;
  reporterUserId:number;
  report: string;
};

export type IPropertyReportCreation = {
  propertyId: number;
  managerId: number;
  reporterUserId:number;
  report: string;
};