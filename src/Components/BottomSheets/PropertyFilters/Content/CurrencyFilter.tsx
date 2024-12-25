import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  FontAwesome5,
} from "@expo/vector-icons";

import { usePropertyFiltersContext } from "@/src/Context/PropertyFiltersContext";
import { ICurrency } from "@/src/GlobalTypes/Property/Common";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { gray, lighterPrimary, primary } from "@/src/Theme/Colors";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { filterCurrencyTypes } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Contants";
import ResetFilterButton from "@/src/Components/Buttons/ResetFilter/ResetFilterButton";
import { sharedCurrencyFilterStyles } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Styles";

type Props = {
  closeBottomSheet: IVoidFunc;
};

const CurrencyFilter: React.FC<Props> = ({ closeBottomSheet }) => {
  const { currencyFilter, setCurrencyFilter } = usePropertyFiltersContext();
  const activePropertyType = useAppSelector(
    (state) => state.activePropertyType.value
  );
  const [currency, setCurrency] = useState<ICurrency | "">(
    currencyFilter.currency
  );

  const handleFilterReset = () => {
    setCurrency("");
    setCurrencyFilter({
      isActive: false,
      currency: "",
      propertyType: "",
    });
    closeBottomSheet();
  };

  const handleApplyFilter = () => {
    setCurrencyFilter({
      isActive: true,
      currency,
      propertyType: activePropertyType,
    });
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
          {currencyFilter.currency && (
            <ResetFilterButton handleResetFunc={handleFilterReset}/>
          )}
        </View>
      </Row>
      <View style={sharedCurrencyFilterStyles.currencyTypeContainer}>
        {filterCurrencyTypes.map((currencyType) => (
          <TouchableOpacity
            key={currencyType}
            onPress={() => setCurrency(currencyType)}
            style={[
              sharedCurrencyFilterStyles.currencyType,
              {
                backgroundColor:
                  currency === currencyType ? lighterPrimary : "transparent",
                borderColor: currency === currencyType ? primary : gray,
              },
            ]}
          >
            <Text
              style={[
                sharedCurrencyFilterStyles.currencyTypeText,
                {
                  color: currency === currencyType ? primary : gray,
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
