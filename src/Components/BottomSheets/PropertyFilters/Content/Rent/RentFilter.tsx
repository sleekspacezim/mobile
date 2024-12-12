import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import RangingSlider from "@/src/Components/Slider/Slider";
import { usePropertyFiltersContext } from "@/src/Context/PropertyFiltersContext";
import { NativeViewGestureHandler } from "react-native-gesture-handler";

type Props = {};

const RentFilter = (props: Props) => {
  const [rentRange, setRentRange] = useState<number>(0);
  const { rentFilter, setPriceFilter } = usePropertyFiltersContext();
  return (
    <View>
      <Text>RentFilter</Text>
      
      <RangingSlider
        minValue={0}
        maxValue={100}
        step={10}
        value={rentRange}
        onChange={(value) => setRentRange(value)}
      />
    </View>
  );
};

export default RentFilter;

const styles = StyleSheet.create({});
