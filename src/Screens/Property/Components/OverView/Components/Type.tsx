import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

import { iconSize, rowContainerStyles } from "../../Shared/Styles";
import { primary } from "@/src/Theme/Colors";
import IconContainer from "@/src/Components/IconContainer/IconContainer";
import RegularText from "@/src/Components/RegularText/RegularText";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";

type Props = {
  type: string;
};

const Type: React.FC<Props> = ({ type }) => {
  return (
    <Row style={rowContainerStyles.rowContainer}>
      <IconContainer>
        <FontAwesome5 name="building" size={iconSize} color={primary} />
      </IconContainer>
      <Row style={{ gap: 5 }}>
        <ThemedText type="subHeader">Type:</ThemedText>
        <RegularText style={{ marginTop: 2 }}>{type}</RegularText>
      </Row>
    </Row>
  );
};

export default Type;
