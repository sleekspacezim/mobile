import { backEndUrl } from "../Utils/Constants";

const baseRouteName = "/user";

export const userRoutes = {
  getUpdateAndDeleteUser: `${backEndUrl}${baseRouteName}`,
  getUserByEmail: `${backEndUrl}${baseRouteName}/email`,
  postAndUpdateUserProfilePicture: `${backEndUrl}${baseRouteName}/profile-picture`,
  removeUserProfilePicture: `${backEndUrl}${baseRouteName}/profile-picture`,
  getAndUpdateUserContactNumber: `${backEndUrl}${baseRouteName}/contact-number`,
  getAndUpdateUserLocation: `${backEndUrl}${baseRouteName}/location`,
};
