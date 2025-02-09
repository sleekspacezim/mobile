import { StyleSheet } from "react-native";

import { lighterPrimary, primary } from "@/src/Theme/Colors";
import { family, small } from "@/src/Theme/Font";

export const propertyScreenStyles = StyleSheet.create({
  container: {
    gap: 10,
    position: "relative",
  },
  optionsContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 2,
    paddingRight: 10,
    width: "100%",
  }
});
