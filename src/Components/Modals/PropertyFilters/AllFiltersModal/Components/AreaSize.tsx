import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { gray, lighterPrimary, primary } from "@/src/Theme/Colors";
import InputField from "@/src/Components/InputField/InputField";
import Divider from "./Divider";
import { propertySizeDimensions } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Contants";
import { sharedAreaSizeFilterStyles } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Styles";
import { IPropertySizeFilter } from "@/src/Context/PropertyFiltersContext";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import usePropertyAreaSizeFilterFuncs from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/FilterItem/Hooks/usePropertyAreaSizeFilterFuncs";
import { activeOpacityOfTouchableOpacity } from "@/src/Utils/Constants";

type Props = {
  propertySize: IPropertySizeFilter;
  propertyType: IPropertyType;
  setPropertySize: React.Dispatch<React.SetStateAction<IPropertySizeFilter>>;
};

const AreaSize: React.FC<Props> = ({
  propertySize,
  propertyType,
  setPropertySize,
}) => {
  const { color, size, handleSelectDimensions, handleSelectSize } =
    usePropertyAreaSizeFilterFuncs(propertySize, propertyType, setPropertySize);

  return (
    <View style={styles.container}>
      <Row style={sharedAreaSizeFilterStyles.row}>
        <MaterialCommunityIcons name="view-grid" size={25} color={primary} />
        <ThemedText type="header">Area Size</ThemedText>
      </Row>
      <View>
        <InputField
          label="Size"
          textValue={size()}
          placeHolder="0"
          handleOnChangeText={handleSelectSize}
          contentType="none"
          type="number"
          width={200}
          height={50}
          borderColor={gray}
        />
      </View>
      <View style={sharedAreaSizeFilterStyles.dimensionContainer}>
        {propertySizeDimensions.map((dimension) => (
          <TouchableOpacity
            key={dimension}
            activeOpacity={activeOpacityOfTouchableOpacity}
            onPress={() => handleSelectDimensions(dimension)}
            style={[
              sharedAreaSizeFilterStyles.dimension,
              {
                backgroundColor: color(
                  dimension,
                  lighterPrimary,
                  "transparent"
                ),
                borderColor: color(dimension, primary, gray),
              },
            ]}
          >
            <Text
              style={[
                sharedAreaSizeFilterStyles.dimensionText,
                {
                  color: color(dimension, primary, gray),
                },
              ]}
            >
              {dimension === "m²" ? "Square Meters" : dimension}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ marginTop: 5 }}>
        <Divider />
      </View>
    </View>
  );
};

export default AreaSize;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 10,
  },
});
