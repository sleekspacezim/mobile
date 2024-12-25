import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

import { ICurrency } from "@/src/GlobalTypes/Property/Common";
import { lighterPrimary, primary, gray } from "@/src/Theme/Colors";
import Divider from "./Divider";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { filterCurrencyTypes } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Contants";
import { sharedCurrencyFilterStyles } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Styles";
import Row from "@/src/Components/Row/Row";

type Props = {
  setCurrency: React.Dispatch<React.SetStateAction<"" | ICurrency>>;
  currency: ICurrency | "";
};

const Currency: React.FC<Props> = ({ setCurrency, currency }) => {
  return (
    <View style={styles.container}>
      <Divider/>
      <Row style={sharedCurrencyFilterStyles.row}>
      <FontAwesome5 name="money-bill" size={25} color={primary} />
      <ThemedText type="header">Currency</ThemedText>
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
      <Divider/>
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
