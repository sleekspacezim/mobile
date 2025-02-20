import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import IconContainer from "@/src/Components/IconContainer/IconContainer";
import RegularText from "@/src/Components/RegularText/RegularText";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { primary } from "@/src/Theme/Colors";
import { rowContainerStyles, iconSize } from "../../Shared/Styles";

type Props = {
  timePosted: string;
};

const PostedTime: React.FC<Props> = ({ timePosted }) => {
  return (
    <Row style={rowContainerStyles.rowContainer}>
      <IconContainer>
        <MaterialCommunityIcons
          name="clock-outline"
          size={iconSize}
          color={primary}
        />
      </IconContainer>
      <Row style={{ gap: 5 }}>
        <ThemedText type="subHeader">Posted:</ThemedText>
        <RegularText style={{ marginTop: 2 }}>{timePosted}</RegularText>
      </Row>
    </Row>
  );
};

export default PostedTime;
