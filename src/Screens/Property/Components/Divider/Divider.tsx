import { View } from "react-native";
import React from "react";

import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { dark, lightGray } from "@/src/Theme/Colors";

const Divider = () => {
  const theme = useAppSelector((state) => state.theme.value);
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: theme === "dark" ? dark.darkGray : lightGray,
        marginBottom:10
      }}
    />
  );
};

export default Divider;
