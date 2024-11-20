import { Text } from "react-native";
import React from "react";

import { family } from "@/src/Theme/Font";
import { gray, primary } from "@/src/Theme/Colors";
import { useAppSelector } from "@/src/Redux/Hooks/Config";

type Props = {
  focused: boolean;
  textItem: string;
};

const TabsLabels: React.FC<Props> = ({ focused, textItem }) => {
  const theme = useAppSelector((state)=>state.theme.value)
  return (
    <Text
      style={{
        fontFamily: family,
        fontSize: 12,
        color:
          theme === "light"
            ? focused
              ? primary
              : gray
            : focused
            ? primary
            : gray,
      }}
    >
      {textItem}
    </Text>
  );
};

export default TabsLabels;

