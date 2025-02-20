import React from "react";
import { Ionicons } from "@expo/vector-icons";

import IconContainer from "@/src/Components/IconContainer/IconContainer";
import RegularText from "@/src/Components/RegularText/RegularText";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { primary } from "@/src/Theme/Colors";
import { rowContainerStyles, iconSize } from "../../Shared/Styles";

type Props = {
  year: number;
};

const YearBuilt: React.FC<Props> = ({ year }) => {
  return (
    <Row style={rowContainerStyles.rowContainer}>
      <IconContainer>
        <Ionicons
          name="calendar-number-outline"
          size={iconSize}
          color={primary}
        />
      </IconContainer>
      <Row style={{ gap: 5 }}>
        <ThemedText type="subHeader">Year built:</ThemedText>
        <RegularText style={{ marginTop: 2 }}>
          {year === 0 ? "---" : year}
        </RegularText>
      </Row>
    </Row>
  );
};

export default YearBuilt;
