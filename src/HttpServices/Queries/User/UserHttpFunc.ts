import axios from "axios";

import { userRoutes } from "@/src/BackendRoutes/UserRoutes";

export const getUserByIdHttpFunc = (requestData: {
  userId: number;
  accessToken: string;
}) => {
  return axios.get(
    `${userRoutes.getUpdateAndDeleteUser}/${requestData.userId}`,
    {
      headers: { Authorization: `Bearer ${requestData.accessToken}` },
    }
  );
};

export const getUserByEmailHttpFunc = (requestData: {
  accessToken: string;
}) => {
  return axios.get(`${userRoutes.getUserByEmail}`, {
    headers: { Authorization: `Bearer ${requestData.accessToken}` },
  });
};
