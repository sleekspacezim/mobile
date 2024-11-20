import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";

import GoogleLogoSVG from "./Logos/GoogleLogoSVG";
import ThemedText from "../../ThemedText/ThemedText";
import { dark, light } from "@/src/Theme/Colors";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { activeOpacityOfTouchableOpacity } from "@/src/Utils/Constants";

type Props = {
  type: "sign_in" | "sign_up";
  disabled: boolean;
};

const GoogleButton: React.FC<Props> = ({ type, disabled }) => {
  const theme = useAppSelector((state) => state.theme.value);
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={activeOpacityOfTouchableOpacity}
      style={[
        styles.container,
        {
          backgroundColor: theme === "light" ? light.background : dark.darkGray,
        },
      ]}
    >
      <GoogleLogoSVG />
      <View style={styles.textContainer}>
        <ThemedText type="regular">
          {type === "sign_in" ? "Login with Google" : "Register with Google"}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

export default GoogleButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 7,
    paddingLeft: 10,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -30,
    flex: 1,
  },
});
