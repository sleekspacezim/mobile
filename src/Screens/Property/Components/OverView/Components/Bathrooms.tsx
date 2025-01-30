import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";

import Row from "@/src/Components/Row/Row";
import { iconSize, rowContainerStyles } from "../../Shared/Styles";
import IconContainer from "@/src/Components/IconContainer/IconContainer";
import { primary } from "@/src/Theme/Colors";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import RegularText from "@/src/Components/RegularText/RegularText";

type Props = {
  bathroomNumber: number;
};

const Bathrooms: React.FC<Props> = ({ bathroomNumber }) => {
  return (
    <Row style={rowContainerStyles.rowContainer}>
      <IconContainer>
        <FontAwesome6 name="shower" size={iconSize} color={primary} />
      </IconContainer>
      <Row style={{ gap: 5 }}>
        <ThemedText type="subHeader">Bathrooms:</ThemedText>
        <RegularText style={{marginTop:2}}>{bathroomNumber}</RegularText>
      </Row>
    </Row>
  );
};

export default Bathrooms;
