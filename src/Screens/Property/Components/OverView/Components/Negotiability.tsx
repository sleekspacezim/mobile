import React from "react";
import { AntDesign, FontAwesome, FontAwesome6 } from "@expo/vector-icons";

import IconContainer from "@/src/Components/IconContainer/IconContainer";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { primary, green, red } from "@/src/Theme/Colors";
import { rowContainerStyles, iconSize } from "../../Shared/Styles";

type Props = {
  isNegotiable: boolean;
};

const Negotiability: React.FC<Props> = ({ isNegotiable }) => {
  return (
    <Row style={rowContainerStyles.rowContainer}>
      <IconContainer>
        <FontAwesome6 name="people-arrows" size={iconSize} color={primary} />
      </IconContainer>
      <Row style={{ gap: 5 }}>
        <ThemedText type="subHeader">Is negotiable:</ThemedText>
        {isNegotiable ? (
          <AntDesign name="check" size={21} color={green} />
        ) : (
          <FontAwesome name="remove" size={21} color={red} />
        )}
      </Row>
    </Row>
  );
};

export default Negotiability;
