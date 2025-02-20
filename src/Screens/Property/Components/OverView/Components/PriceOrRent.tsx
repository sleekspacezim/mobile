import React from "react";
import millify from "millify";
import { Ionicons } from "@expo/vector-icons";

import { ICurrency } from "@/src/GlobalTypes/Property/Common";
import IconContainer from "@/src/Components/IconContainer/IconContainer";
import { iconSize, rowContainerStyles } from "../../Shared/Styles";
import { primary } from "@/src/Theme/Colors";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import RegularText from "@/src/Components/RegularText/RegularText";

type Props = {
  amount: number;
  currency: ICurrency;
  type: "Rent" | "Price";
};

const PriceOrRent: React.FC<Props> = ({ amount, currency, type }) => {
  return (
    <Row style={rowContainerStyles.rowContainer}>
      <IconContainer>
        <Ionicons name="pricetag-outline" size={iconSize} color={primary} />
      </IconContainer>
      <Row style={{gap:10}}>
        <ThemedText type="subHeader">{type}:</ThemedText>
        <RegularText>
          {currency}
          {millify(amount)}
          {type === "Price" ? "" : "/month"}
        </RegularText>
      </Row>
    </Row>
  );
};

export default PriceOrRent;
