import { StyleSheet, Text } from "react-native";
import React from "react";
import millify from "millify";

import { ICurrency } from "@/src/GlobalTypes/Property/Common";
import RegularText from "@/src/Components/RegularText/RegularText";
import Row from "@/src/Components/Row/Row";
import { primary } from "@/src/Theme/Colors";
import { family, small } from "@/src/Theme/Font";
import { shortenString } from "@/src/Utils/Funcs";

type Props = {
  name: string;
  amount: number;
  currency: ICurrency;
  type: "rental" | "sale";
};

const NameRentOrPrice: React.FC<Props> = ({ name, amount, currency, type }) => {
  return (
    <Row style={styles.container}>
      <RegularText>{shortenString(name, 22)}</RegularText>
      <Text style={styles.amount}>{`${currency}${millify(amount)}${
        type === "rental" ? "/month" : ""
      }`}</Text>
    </Row>
  );
};

export default NameRentOrPrice;

const styles = StyleSheet.create({
  container: { justifyContent: "space-between", alignItems: "center" },
  amount: {
    fontFamily: family,
    fontSize: small,
    color: primary,
  },
});
