import axios from "axios";

import { userRoutes } from "@/src/BackendRoutes/UserRoutes";
import { IUser } from "@/src/GlobalTypes/User/UserTypes";

export const updateUserHttpFunc = (userData: IUser) => {
  return axios.put(
    `${userRoutes.getUpdateAndDeleteUser}/${userData.id}`,userData,
    {
      headers: { Authorization: `Bearer ${userData.accessToken}` },
    }
  );
};

export const deleteUserHttpFunc = (userData: {
  id: number;
  accessToken: string;
}) => {
  return axios.delete(`${userRoutes.getUpdateAndDeleteUser}/${userData.id}`, {
    headers: { Authorization: `Bearer ${userData.accessToken}` },
  });
};
