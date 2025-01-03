import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";

import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { family, small } from "@/src/Theme/Font";
import { primary } from "@/src/Theme/Colors";

type Props = {
  handleResetFunc: IVoidFunc;
};

const ResetFilterButton: React.FC<Props> = ({ handleResetFunc }) => {
  return (
    <Pressable style={styles.pressable} onPress={handleResetFunc}>
      <Text style={styles.resetText}>Reset</Text>
    </Pressable>
  );
};

export default ResetFilterButton;

const styles = StyleSheet.create({
  pressable: {
    padding: 5,
  },
  resetText: {
    color: primary,
    fontFamily: family,
    fontSize: small,
    fontWeight: "700",
  },
});
