import axios from "axios";

import { managerRoutes } from "@/src/BackendRoutes/ManagerRoutes";
import { IManagerAccountCreation, IUpdateManagerAccountEmailAndName } from "@/src/GlobalTypes/Manager/ManagerTypes";

export const CreateManager = (requestData: {
  accessToken: string;
  manager: IManagerAccountCreation;
}) => {
  return axios.post(
    managerRoutes.postDeleteAndGetManagerAccountById,
    requestData.manager,
    {
      headers: {
        Authorization: `Bearer ${requestData.accessToken}`,
      },
    }
  );
};

export const UpdateManager = (requestData: {
  accessToken: string;
  managerId: number;
  managerEmailAndNameUpdates: IUpdateManagerAccountEmailAndName;
}) => {
  return axios.put(
    managerRoutes.postDeleteAndGetManagerAccountById + `/${requestData.managerId}`,
    requestData.managerEmailAndNameUpdates,
    {
      headers: {
        Authorization: `Bearer ${requestData.accessToken}`,
      },
    }
  );
};

export const deleteManager = (requestData: {
  accessToken: string;
  id: number;
}) => {
  return axios.delete(
    managerRoutes.postDeleteAndGetManagerAccountById + `/${requestData.id}`,
    {
      headers: {
        Authorization: `Bearer ${requestData.accessToken}`,
      },
    }
  );
};

