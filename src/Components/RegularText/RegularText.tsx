import { StyleSheet, Text, TextStyle } from "react-native";
import React from "react";

import { family, small } from "@/src/Theme/Font";
import { gray } from "@/src/Theme/Colors";

type Props = {
  style?: TextStyle;
  children: React.ReactNode;
};

const RegularText: React.FC<Props> = ({ style, children }) => {
  return <Text style={[style, styles.textStyle]}>{children}</Text>;
};

export default RegularText;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: family,
    fontSize: small,
    color: gray,
  },
});
