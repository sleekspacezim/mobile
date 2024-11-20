import { StyleSheet, View } from "react-native";
import React from "react";

import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { propertyCardBorderRadius } from "../Constants/Constants";

type Props = {
  children: React.ReactNode;
};
const CardInformation: React.FC<Props> = ({ children }) => {
  const theme = useAppSelector((state) => state.theme.value);
  const borderColor = theme === "light" ? "#9c9c9c" : "#1E1E1E";
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: borderColor,
          borderLeftColor: borderColor,
          borderRightColor: borderColor,
        },
      ]}
    >
      {children}
    </View>
  );
};

export default CardInformation;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 6,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomRightRadius: propertyCardBorderRadius,
    borderBottomLeftRadius: propertyCardBorderRadius,
  },
});
