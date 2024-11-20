import axios from "axios";

import { managerRoutes } from "@/src/BackendRoutes/ManagerRoutes";
import { IManagerContactNumber } from "../../../GlobalTypes/Manager/ManagerTypes";

export const UpdateManagerContactNumbers = (requestData: {
  accessToken: string;
  managerId: number;
  managerContacts: IManagerContactNumber[];
}) => {
  return axios.put(
    managerRoutes.updateManagerContactNumbers + `/${requestData.managerId}`,
    { contacts: requestData.managerContacts },
    {
      headers: {
        Authorization: `Bearer ${requestData.accessToken}`,
      },
    }
  );
};
