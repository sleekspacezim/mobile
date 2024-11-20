export type IPropertyImageOrVideo = {
  id: number;
  propertyId: number;
  uri: string;
  name: string;
  contentType: string | undefined;
  size: number;
  fileType: string | undefined;
};

export type IPropertyImageOrVideoCreationOrUpdate = {
  id?: number;
  propertyId?: number;
  file: string;
  name: string;
  contentType: string | undefined;
  size: number;
  fileType: string | undefined;
};
