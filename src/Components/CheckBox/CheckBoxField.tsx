import { StyleSheet, View } from "react-native";
import Checkbox from "expo-checkbox";
import React from "react";

import ThemedText from "../ThemedText/ThemedText";
import { gray, primary } from "@/src/Theme/Colors";

type Props = {
  value: boolean;
  label: string;
  setChecked: (value: boolean) => void;
};

const CheckBoxField: React.FC<Props> = ({ value, setChecked, label }) => {
  return (
    <View style={styles.container}>
      <Checkbox
        value={value}
        onValueChange={setChecked}
        color={value ? primary : undefined}
        style={styles.checkbox}
      />
      <ThemedText type="regular">{label}</ThemedText>
    </View>
  );
};

export default CheckBoxField;

const styles = StyleSheet.create({
  container: {
    gap: 5,
    flexDirection:"row",
    alignItems:"flex-start"
  },
  checkbox: {
    borderRadius: 5,
    borderColor: gray
  },
});
