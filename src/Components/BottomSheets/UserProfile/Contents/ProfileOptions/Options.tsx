import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { gray } from "@/src/Theme/Colors";

const iconSize = 28;
const iconColor = gray;

export const signedInContent = [
  {
    name: "View Profile",
    icon: <Ionicons name="person-outline" size={iconSize} color={iconColor} />,
    onPressFunc: () => router.push("/account/profile"),
  },
  {
    name: "My Manager Account",
    icon: (
      <MaterialCommunityIcons
        name="office-building-cog-outline"
        size={iconSize}
        color={iconColor}
      />
    ),
    onPressFunc: () => router.push("/account/manager"),
  },
  {
    name: "Settings",
    icon: (
      <Ionicons name="settings-outline" size={iconSize} color={iconColor} />
    ),
    onPressFunc: () => router.push("/account"),
  },
  {
    name: "Logout",
    icon: (
      <MaterialCommunityIcons name="logout" size={iconSize} color={iconColor} />
    ),
    onPressFunc: () => {},
  },
];

export const signedOutContent = [
  {
    name: "Sign In",
    icon: (
      <MaterialCommunityIcons name="login" size={iconSize} color={iconColor} />
    ),
    onPressFunc: () => {
      router.push("/login");
    },
  },
  {
    name: "Register",
    icon: (
      <MaterialCommunityIcons
        name="account-check-outline"
        size={iconSize}
        color={iconColor}
      />
    ),
    onPressFunc: () => {
      router.push("/register");
    },
  },
  {
    name: "Terms and Conditions",
    icon: <Octicons name="code-of-conduct" size={iconSize} color={iconColor} />,
    onPressFunc: () => {
      router.push("/account/termsAndconditions");
    },
  },
  {
    name: "Help&Support",
    icon: (
      <MaterialIcons name="help-outline" size={iconSize} color={iconColor} />
    ),
    onPressFunc: () => {
      router.push("/account/support");
    },
  },
];