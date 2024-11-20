import axios from "axios";

import { userRoutes } from "@/src/BackendRoutes/UserRoutes";
import { IUserContactNumber } from "@/src/GlobalTypes/User/UserTypes";

export const updateAndCreateContactNumberHttpFunc = (contactData: {
  contactNumbers: IUserContactNumber[];
  accessToken: string;
  userId: number;
}) => {
  return axios.put(
    `${userRoutes.getAndUpdateUserContactNumber}/${contactData.userId}`,
    { contacts: contactData.contactNumbers },
    {
      headers: { Authorization: `Bearer ${contactData.accessToken}` },
    }
  );
};

export const createContactHttpFunc = (contactData: {
  contactNumber: IUserContactNumber;
  accessToken: string;
}) => {
  return axios.post(
    `${userRoutes.getAndUpdateUserContactNumber}`,
    contactData.contactNumber,
    {
      headers: { Authorization: `Bearer ${contactData.accessToken}` },
    }
  );
};
