import React from "react";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import Row from "@/src/Components/Row/Row";
import IconContainer from "@/src/Components/IconContainer/IconContainer";
import RegularText from "@/src/Components/RegularText/RegularText";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { green, primary, red } from "@/src/Theme/Colors";
import { rowContainerStyles, iconSize } from "../../Shared/Styles";

type Props = {
  hasWater: boolean;
  hasElectricity: boolean;
  type: "built" | "non-built" | "stand";
};

const PublicUtilities: React.FC<Props> = ({
  hasWater,
  hasElectricity,
  type,
}) => {
  return (
    <Row style={{ alignItems: "center", gap: 10 }}>
      <Row style={rowContainerStyles.rowContainer}>
        <IconContainer>
          <MaterialIcons name="electric-bolt" size={iconSize} color={primary} />
        </IconContainer>
        <Row style={{ gap: 5 }}>
          <ThemedText type="subHeader">
            {type === "built" ? "Has electricity" : "Area has electricity"}:
          </ThemedText>
          {hasWater ? (
            <AntDesign name="check" size={21} color={green} />
          ) : (
            <FontAwesome name="remove" size={21} color={red} />
          )}
        </Row>
      </Row>
      <Row style={rowContainerStyles.rowContainer}>
        <IconContainer>
          <MaterialCommunityIcons
            name="water-pump"
            size={iconSize}
            color={primary}
          />
        </IconContainer>
        <Row style={{ gap: 5 }}>
          <ThemedText type="subHeader">
            {type === "built"
              ? "Has water"
              : type === "stand"
              ? "Is serviced"
              : "Area has water"}
            :
          </ThemedText>
          <RegularText>
            {hasElectricity ? (
              <AntDesign name="check" size={21} color={green} />
            ) : (
              <FontAwesome name="remove" size={21} color={red} />
            )}
          </RegularText>
        </Row>
      </Row>
    </Row>
  );
};

export default PublicUtilities;
