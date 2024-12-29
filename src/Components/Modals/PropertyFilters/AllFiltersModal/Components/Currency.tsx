import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

import { ICurrency, IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { lighterPrimary, primary, gray } from "@/src/Theme/Colors";
import Divider from "./Divider";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { filterCurrencyTypes } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Contants";
import { sharedCurrencyFilterStyles } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Styles";
import Row from "@/src/Components/Row/Row";
import { ICurrencyFilter } from "@/src/Context/PropertyFiltersContext";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import useCurrencyFilterFuncs from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/FilterItem/Hooks/useCurrencyFilterFuncs";

type Props = {
  setCurrency: React.Dispatch<React.SetStateAction<ICurrencyFilter>>;
  currency: ICurrencyFilter;
  propertyType: IPropertyType;
};

const Currency: React.FC<Props> = ({ setCurrency, currency, propertyType }) => {
  
  const {handleSelectCurrency,color} = useCurrencyFilterFuncs(currency,propertyType,setCurrency)
  return (
    <View style={styles.container}>
      <Divider />
      <Row style={sharedCurrencyFilterStyles.row}>
        <FontAwesome5 name="money-bill" size={25} color={primary} />
        <ThemedText type="header">Currency</ThemedText>
      </Row>
      <View style={sharedCurrencyFilterStyles.currencyTypeContainer}>
        {filterCurrencyTypes.map((currencyType) => (
          <TouchableOpacity
            key={currencyType}
            onPress={() => handleSelectCurrency(currencyType)}
            style={[
              sharedCurrencyFilterStyles.currencyType,
              {
                backgroundColor: color(
                  currencyType,
                  lighterPrimary,
                  "transparent"
                ),
                borderColor: color(currencyType, primary, gray),
              },
            ]}
          >
            <Text
              style={[
                sharedCurrencyFilterStyles.currencyTypeText,
                {
                  color: color(currencyType, primary, gray),
                },
              ]}
            >
              {currencyType === "R"
                ? "Rands"
                : currencyType === "US$"
                ? "USD"
                : "ZIG"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Divider />
    </View>
  );
};

export default Currency;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 10,
  },
});
