import axios from "axios";

import { propertyMediaRoutes } from "@/src/BackendRoutes/Properties/Media/PropertyMediaRoutes";
import { IPropertyImageOrVideoCreationOrUpdate } from "@/src/GlobalTypes/Property/Media/ImageOrVideoTypes";

export const postPropertyImagesOrVideosHttpFunc = (requestData: {
  imagesOrVideos: IPropertyImageOrVideoCreationOrUpdate[];
  accessToken: string;
}) => {
  return axios.post(
    `${propertyMediaRoutes.postGetDeleteAndUpdatePropertyMedia}`,
    { files: requestData.imagesOrVideos },
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const updatePropertyImageOrVideoHttpFunc = (requestData: {
  imageOrVideo: IPropertyImageOrVideoCreationOrUpdate;
  accessToken: string;
}) => {
  return axios.put(
    `${propertyMediaRoutes.postGetDeleteAndUpdatePropertyMedia}/${requestData.imageOrVideo.id}`,
    requestData.imageOrVideo,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const deletePropertyImageOrVideoHttpFunc = (requestData: {
  imageOrVideoId: number;
  accessToken: string;
}) => {
  return axios.delete(
    `${propertyMediaRoutes.postGetDeleteAndUpdatePropertyMedia}/${requestData.imageOrVideoId}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};
