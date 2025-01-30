import React from "react";
import {
  AntDesign,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";

import IconContainer from "@/src/Components/IconContainer/IconContainer";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { green, primary, red } from "@/src/Theme/Colors";
import { rowContainerStyles, iconSize } from "../../Shared/Styles";

type Props = {
  hasPool: boolean;
};

const Pool: React.FC<Props> = ({ hasPool }) => {
  return (
    <Row style={rowContainerStyles.rowContainer}>
      <IconContainer>
      <MaterialIcons name="pool" size={iconSize} color={primary} />
      </IconContainer>
      <Row style={{ gap: 5 }}>
        <ThemedText type="subHeader">Pool:</ThemedText>
        {hasPool ? (
          <AntDesign name="check" size={21} color={green} />
        ) : (
          <FontAwesome name="remove" size={21} color={red} />
        )}
      </Row>
    </Row>
  );
};

export default Pool;
