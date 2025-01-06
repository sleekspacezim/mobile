import { StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";

import RegularText from "@/src/Components/RegularText/RegularText";
import Row from "@/src/Components/Row/Row";
import { primary } from "@/src/Theme/Colors";
import IconContainer from "../IconContainer/IconContainer";
import { shortenString } from "@/src/Utils/Funcs";
import { SCREEN_BREAK_POINT } from "@/src/Utils/Constants";
import { iconSize } from "../Shared/Contants";

type Props = {
  displayName: string;
};

const Location: React.FC<Props> = ({ displayName }) => {
  const { width } = useWindowDimensions();
  return (
    <Row style={styles.container}>
      <IconContainer>
        <EvilIcons name="location" size={iconSize} color={primary} />
      </IconContainer>
      <RegularText style={{ flex: 1, flexWrap: "wrap" }}>
        {width > SCREEN_BREAK_POINT
          ? displayName
          : shortenString(displayName, 70)}
      </RegularText>
    </Row>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: { gap: 5, alignItems: "center" },
});
