import axios from "axios";

import { userRoutes } from "@/src/BackendRoutes/UserRoutes";
import { IUserProfilePictureUpdateAndCreation } from "@/src/GlobalTypes/User/UserTypes";

export const createUserProfilePictureHttpFunc = (requestData: {
  profilePicture: IUserProfilePictureUpdateAndCreation;
  accessToken: string;
}) => {
  return axios.post(
    `${userRoutes.postAndUpdateUserProfilePicture}/${requestData.profilePicture.userId}`,
    requestData.profilePicture,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const updateUserProfilePictureHttpFunc = (requestData: {
  profilePicture: IUserProfilePictureUpdateAndCreation;
  accessToken: string;
}) => {
  return axios.put(
    `${userRoutes.postAndUpdateUserProfilePicture}/${requestData.profilePicture.userId}`,
    requestData.profilePicture,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const removeUserProfilePictureHttpFunc = (requestData: {
  profilePictureId: number;
  accessToken: string;
}) => {
  return axios.delete(
    `${userRoutes.removeUserProfilePicture}/${requestData.profilePictureId}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};
