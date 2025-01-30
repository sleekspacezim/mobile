import { AntDesign } from "@expo/vector-icons";
import React from "react";

import IconContainer from "@/src/Components/IconContainer/IconContainer";
import RegularText from "@/src/Components/RegularText/RegularText";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { primary } from "@/src/Theme/Colors";
import { rowContainerStyles, iconSize } from "../../Shared/Styles";

type Props = {
  size: number;
  sizeDimensions: string;
};

const Size: React.FC<Props> = ({ size, sizeDimensions }) => {
  return (
    <Row style={rowContainerStyles.rowContainer}>
      <IconContainer>
      <AntDesign name="appstore-o" size={iconSize} color={primary} />
      </IconContainer>
      <Row style={{ gap: 5 }}>
        <ThemedText type="subHeader">Size:</ThemedText>
        <RegularText style={{ marginTop: 2 }}>
          {size} {sizeDimensions === "Square meters" ? "m²" : sizeDimensions}
        </RegularText>
      </Row>
    </Row>
  );
};

export default Size;
