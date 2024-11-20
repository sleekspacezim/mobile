import { View, ActivityIndicator } from "react-native";
import React from "react";

import { dark, light } from "@/src/Theme/Colors";
import { useAppSelector } from "@/src/Redux/Hooks/Config";

const ButtonSpinner: React.FC<{ backGroundColor?: string }> = ({
  backGroundColor,
}) => {
  const theme = useAppSelector((state) => state.theme.value);
  return (
    <View style={{ width: "100%" }}>
      <ActivityIndicator
        size={"small"}
        color={
          backGroundColor
            ? backGroundColor
            : theme === "light"
            ? light.text
            : dark.text
        }
      />
    </View>
  );
};

export default ButtonSpinner;
