import axios from "axios";

import { managerRoutes } from "@/src/BackendRoutes/ManagerRoutes";
import { IManagerProfilePictureUpdateAndCreation } from "@/src/GlobalTypes/Manager/ManagerTypes";

export const UpdateManagerProfilePicture = (requestData: {
    accessToken: string;
    managerId: number;
    managerProfilePicture: IManagerProfilePictureUpdateAndCreation;
  }) => {
    return axios.put(
      managerRoutes.updateManagerProfilePicture + `/${requestData.managerId}`,
      requestData.managerProfilePicture,
      {
        headers: {
          Authorization: `Bearer ${requestData.accessToken}`,
        },
      }
    );
  };

  export const removeManagerProfilePicture = (requestData: {
    accessToken: string;
    managerId: number;
    managerProfilePicture: IManagerProfilePictureUpdateAndCreation;
  }) => {
    return axios.put(
      managerRoutes.removeManagerProfilePicture + `/${requestData.managerId}`,
      requestData.managerProfilePicture,
      {
        headers: {
          Authorization: `Bearer ${requestData.accessToken}`,
        },
      }
    );
  };