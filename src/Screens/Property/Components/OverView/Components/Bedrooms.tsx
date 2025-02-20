import { Ionicons } from "@expo/vector-icons";
import React from "react";

import Row from "@/src/Components/Row/Row";
import IconContainer from "@/src/Components/IconContainer/IconContainer";
import { primary } from "@/src/Theme/Colors";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import RegularText from "@/src/Components/RegularText/RegularText";
import { rowContainerStyles } from "../../Shared/Styles";

type Props = {
  bedroomNumber: number;
};

const Bedrooms: React.FC<Props> = ({ bedroomNumber }) => {
  return (
    <Row style={rowContainerStyles.rowContainer}>
      <IconContainer>
        <Ionicons name="bed-outline" size={25} color={primary} />
      </IconContainer>
      <Row style={{ gap: 5 }}>
        <ThemedText type="subHeader">Bedrooms:</ThemedText>
        <RegularText style={{ marginTop: 2 }}>{bedroomNumber}</RegularText>
      </Row>
    </Row>
  );
};

export default Bedrooms;
