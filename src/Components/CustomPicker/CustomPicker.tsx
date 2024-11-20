import { DimensionValue, StyleSheet, View } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";

import { gray } from "@/src/Theme/Colors";
import { family } from "@/src/Theme/Font";
import ThemedText from "../ThemedText/ThemedText";

type Props = {
  setValue: (value: string | number) => void;
  initialValue: string | number;
  width?: DimensionValue;
  label?: string;
  pickerList: {
    label: string;
    value: string | number;
  }[];
};

const CustomPicker: React.FC<Props> = ({
  setValue,
  pickerList,
  width,
  initialValue,
  label,
}) => {
  return (
    <View style={{ width: width ? width : "100%" }}>
      {label && <ThemedText type="regular">{label}</ThemedText>}
      <View style={[styles.container]}>
        <Picker
          selectedValue={initialValue}
          onValueChange={(itemValue) => setValue(itemValue)}
          dropdownIconColor={gray}
          selectionColor={"red"}
        >
          {pickerList.map((item) => (
            <Picker.Item
              label={item.label}
              value={item.value}
              key={item.value}
              fontFamily={family}
              color={gray}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default CustomPicker;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: gray,
    borderRadius: 7,
  },
});
