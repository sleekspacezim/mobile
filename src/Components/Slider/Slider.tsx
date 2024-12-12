import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";
import { NativeViewGestureHandler } from "react-native-gesture-handler";

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
  return (
    <NativeViewGestureHandler disallowInterruption={true}>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={minValue}
        maximumValue={maxValue}
        step={step}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
    </NativeViewGestureHandler>
  );
};

export default RangingSlider;

const styles = StyleSheet.create({
  container: {
    height: 20,
  },
});
