import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";

import { dark, gray, primary, pureWhite } from "@/src/Theme/Colors";
import { useAppSelector } from "@/src/Redux/Hooks/Config";

type Props = {
  color?: string;
  value: number;
  step: number;
  minValue: number;
  maxValue: number;
  onChange: (value: number) => void;
};

const RangingSlider: React.FC<Props> = ({
  color,
  value,
  step,
  maxValue,
  minValue,
  onChange,
}) => {
  const theme = useAppSelector((state) => state.theme.value);
  return (
    <Slider
      style={styles.container}
      minimumValue={minValue}
      maximumValue={maxValue}
      step={step}
      value={value}
      onValueChange={onChange}
      minimumTrackTintColor={"blue"}
      maximumTrackTintColor={gray}
      lowerLimit={0}
      thumbTintColor={theme === "dark" ? pureWhite : dark.darkGray}
    />
  );
};

export default RangingSlider;

const styles = StyleSheet.create({
  container: {
    height: 20,
  },
});
