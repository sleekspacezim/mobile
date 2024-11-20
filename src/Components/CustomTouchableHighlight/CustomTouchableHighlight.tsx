import {
  StyleProp,
  TouchableHighlight,
  ViewStyle,
} from "react-native";
import React from "react";

import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { useAppSelector } from "@/src/Redux/Hooks/Config";

type Props = {
  styles: StyleProp<ViewStyle>;
  onPressFunc: IVoidFunc;
  children: React.ReactNode;
};

const CustomTouchableHighlight: React.FC<Props> = ({
  styles,
  onPressFunc,
  children,
}) => {
  const theme = useAppSelector((state) => state.theme.value);
  const underLayColor = theme === "light" ? "#DDDBDE" : "#3B3B3B";
  return (
    <TouchableHighlight
      style={styles}
      underlayColor={underLayColor}
      onPress={onPressFunc}
    >
      {children}
    </TouchableHighlight>
  );
};

export default CustomTouchableHighlight;
