import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";

import { IAccountOptions } from "../Types/Types";
import { gray } from "@/src/Theme/Colors";

const iconSize = 26;
const iconColor = gray;

export const settings: IAccountOptions = [
  {
    name: "Change Password",
    icon: <Ionicons name="lock-closed-outline" size={iconSize} color={iconColor} />,
    route: "/resetPassword",
  },
  {
    name: "Theme",
    icon: (
      <MaterialCommunityIcons
        name="theme-light-dark"
        size={iconSize}
        color={iconColor}
      />
    ),
    route: "/account/theme",
  },
  {
    name: "Search History",
    icon: <MaterialIcons name="history" size={iconSize} color={iconColor} />,
    route: "/account/history",
  },
  {
    name: "Notifications",
    icon: <Ionicons name="notifications-outline" size={iconSize} color={iconColor} />,
    route: "/account/notifications",
  },
];

export const preferences: IAccountOptions = [
  {
    name: "Profile",
    icon: <Ionicons name="person-outline" size={iconSize} color={iconColor} />,
    route: "/account/profile",
  },
  {
    name: "Property Manager Account",
    icon: (
      <MaterialCommunityIcons name="office-building-cog-outline" size={iconSize} color={iconColor} />
    ),
    route: "/account/manager",
  },
  {
    name: "My Chats",
    icon: <Ionicons name="chatbubbles-outline" size={iconSize} color={iconColor} />,
    route: "/chats",
  },
  {
    name: "My Favorites",
    icon: (
      <MaterialIcons
        name="favorite-outline"
        size={iconSize}
        color={iconColor}
      />
    ),
    route: "/favorites",
  },
  {
    name: "Billing&Payments",
    icon: <MaterialIcons name="payment" size={iconSize} color={iconColor} />,
    route: "/account/payments",
  },
  {
    name: "Help&Support",
    icon: (
      <MaterialIcons name="help-outline" size={iconSize} color={iconColor} />
    ),
    route: "/account/support",
  },
];

export const legalities: IAccountOptions = [
  {
    name: "Legals",
    icon: <Octicons name="law" size={iconSize} color={iconColor} />,
    route: "/account/legals",
  },
  {
    name: "Terms and Conditions",
    icon: <Octicons name="code-of-conduct" size={iconSize} color={iconColor} />,
    route: "/account/termsAndconditions",
  },
];
