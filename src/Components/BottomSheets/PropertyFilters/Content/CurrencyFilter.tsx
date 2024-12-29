import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

import {
  ICurrencyFilter,
  usePropertyFiltersContext,
} from "@/src/Context/PropertyFiltersContext";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { gray, lighterPrimary, primary } from "@/src/Theme/Colors";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { filterCurrencyTypes } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Contants";
import ResetFilterButton from "@/src/Components/Buttons/ResetFilter/ResetFilterButton";
import { sharedCurrencyFilterStyles } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Styles";
import {
  activeOpacityOfTouchableOpacity,
  PropertyTypesEnum,
} from "@/src/Utils/Constants";
import useCurrencyFilterFuncs from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/FilterItem/Hooks/useCurrencyFilterFuncs";

type Props = {
  closeBottomSheet: IVoidFunc;
};

const CurrencyFilter: React.FC<Props> = ({ closeBottomSheet }) => {
  const { currencyFilter } = usePropertyFiltersContext();
  const activePropertyType = useAppSelector(
    (state) => state.activePropertyType.value
  );
  const [currency, setCurrency] = useState<ICurrencyFilter>(currencyFilter);

  const {
    handleSelectCurrency,
    color,
    resetCurrencyFilter,
    applyCurrencyFilter,
  } = useCurrencyFilterFuncs(currency, activePropertyType, setCurrency);

  const isCurrencySelected = () => {
    if (activePropertyType === PropertyTypesEnum.CommercialForSale) {
      if (currencyFilter.commercialForsale) return true;
      else return false;
    } else if (activePropertyType === PropertyTypesEnum.CommercialRentals) {
      if (currencyFilter.commercialRentals) return true;
      else return false;
    } else if (activePropertyType === PropertyTypesEnum.ResidentialForSale) {
      if (currencyFilter.residentialForsale) return true;
      else return false;
    } else if (activePropertyType === PropertyTypesEnum.ResidentialRentals) {
      if (currencyFilter.residentialRentals) return true;
      else return false;
    } else if (activePropertyType === PropertyTypesEnum.Stands) {
      if (currencyFilter.stand) return true;
      else return false;
    } else {
      if (currencyFilter.land) return true;
      else return false;
    }
  };

  const handleFilterReset = () => {
    resetCurrencyFilter();
    closeBottomSheet();
  };

  const handleApplyFilter = () => {
    applyCurrencyFilter();
    closeBottomSheet();
  };

  return (
    <View style={styles.container}>
      <Row style={styles.headerContainer}>
        <Row style={sharedCurrencyFilterStyles.row}>
          <FontAwesome5 name="money-bill" size={25} color={primary} />
          <ThemedText type="subHeader">Currency</ThemedText>
        </Row>
        <View style={{ height: 30 }}>
          {isCurrencySelected() && (
            <ResetFilterButton handleResetFunc={handleFilterReset} />
          )}
        </View>
      </Row>
      <View style={sharedCurrencyFilterStyles.currencyTypeContainer}>
        {filterCurrencyTypes.map((currencyType) => (
          <TouchableOpacity
            activeOpacity={activeOpacityOfTouchableOpacity}
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
      <CustomButton title="Apply" onPressFunc={handleApplyFilter} />
    </View>
  );
};

export default CurrencyFilter;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
});
