import { backEndUrl } from "../../../Utils/Constants";

const baseRouteName = "/property/stand";

export const standRoutes = {
  getAllGetOnePostDeleteAndUpdateStand: `${backEndUrl}${baseRouteName}`,
  searchStandsByLocation: `${backEndUrl}${baseRouteName}/search`
};