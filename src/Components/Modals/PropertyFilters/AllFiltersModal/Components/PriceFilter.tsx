import { StyleSheet, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import InputField from "@/src/Components/InputField/InputField";
import RangingSlider from "@/src/Components/RangingSlider/RangingSlider";
import RegularText from "@/src/Components/RegularText/RegularText";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { primary } from "@/src/Theme/Colors";
import Divider from "./Divider";
import { sharedPriceFilterStyles } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Styles";
import { IPriceFilter } from "@/src/Context/PropertyFiltersContext";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import usePriceFilterFuncs from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/FilterItem/Hooks/usePriceFilterFuncs";

type Props = {
  price: IPriceFilter;
  setPrice: React.Dispatch<React.SetStateAction<IPriceFilter>>;
  propertyType: IPropertyType;
};

const PriceFilter: React.FC<Props> = ({ price, setPrice, propertyType }) => {
  const maxValue = 1000000;
  const { borderColor, priceMax, priceMin, setPriceMax, setPriceMin } =
    usePriceFilterFuncs(price, propertyType, setPrice);

  return (
    <View style={styles.container}>
      <Row style={sharedPriceFilterStyles.row}>
        <Ionicons name="pricetag-outline" size={25} color={primary} />
        <ThemedText type="header">Price</ThemedText>
      </Row>
      <View style={sharedPriceFilterStyles.sliderContainer}>
        <RegularText>(Min) Price</RegularText>
        <RangingSlider
          maxValue={maxValue}
          minValue={0}
          onChange={setPriceMin}
          value={priceMin()}
          step={10}
        />
      </View>
      <Row style={sharedPriceFilterStyles.inputRow}>
        <View>
          <InputField
            textValue={priceMin().toString()}
            placeHolder="0"
            handleOnChangeText={(rent: string) => setPriceMin(+rent)}
            contentType="none"
            type="number"
            width={130}
            height={50}
            borderColor={borderColor()}
          />
        </View>
        <ThemedText type="regular">To</ThemedText>
        <View>
          <InputField
            textValue={priceMax().toString()}
            placeHolder="Any"
            handleOnChangeText={(rent: string) => setPriceMax(+rent)}
            contentType="none"
            type="number"
            width={130}
            height={50}
            borderColor={borderColor()}
          />
        </View>
      </Row>
      <View style={sharedPriceFilterStyles.sliderContainer}>
        <RegularText>(Max) Price</RegularText>
        <RangingSlider
          maxValue={maxValue}
          minValue={0}
          onChange={setPriceMax}
          value={priceMax()}
          step={10}
        />
      </View>
      <View style={{ marginTop: 5 }}>
        <Divider />
      </View>
    </View>
  );
};

export default PriceFilter;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 10,
  },
});
