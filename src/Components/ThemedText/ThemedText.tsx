import {
  Text,
  TextStyle,
} from "react-native";
import React from "react";

import { family, large, medium, small } from "@/src/Theme/Font";
import { dark, light } from "@/src/Theme/Colors";
import { useAppSelector } from "@/src/Redux/Hooks/Config";

type Props = {
  styles?: TextStyle;
  type: "regular" | "subHeader" | "header";
  children: React.ReactNode;
};

const ThemedText: React.FC<Props> = ({ styles, type, children }) => {
  const theme = useAppSelector((state) => state.theme.value);
  return (
    <Text
      style={[
        styles,
        {
          fontFamily: family,
          fontSize:
            type === "header" ? large : type === "subHeader" ? medium : small,
          fontWeight:
            type === "header" ? "bold" : type === "subHeader" ? "800" : "400",
          color: theme === "light" ? light.text : dark.text,
        },
      ]}
    >
      {children}
    </Text>
  );
};

export default ThemedText;
