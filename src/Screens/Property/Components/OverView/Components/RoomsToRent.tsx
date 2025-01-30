import React from "react";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";

import IconContainer from "@/src/Components/IconContainer/IconContainer";
import RegularText from "@/src/Components/RegularText/RegularText";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { green, primary } from "@/src/Theme/Colors";
import { rowContainerStyles, iconSize } from "../../Shared/Styles";

type Props = {
  rooms: number;
  isFullSpace?: boolean;
  isFullHouse?: boolean;
  type: "Residential" | "Commercial";
};

const RoomsToRent: React.FC<Props> = ({
  rooms,
  type,
  isFullHouse,
  isFullSpace,
}) => {
  return (
    <Row style={rowContainerStyles.rowContainer}>
      <IconContainer>
        {isFullHouse || isFullSpace ? (
          <Ionicons name="home-outline" size={iconSize} color={primary} />
        ) : (
          <MaterialIcons
            name="room-preferences"
            size={iconSize}
            color={primary}
          />
        )}
      </IconContainer>
      {isFullHouse === undefined && isFullSpace === undefined && (
        <Row style={{ gap: 5 }}>
          <ThemedText type="subHeader">Rooms to rent:</ThemedText>
          <RegularText style={{ marginTop: 2 }}>{rooms}</RegularText>
        </Row>
      )}
      {(isFullHouse || isFullSpace) && (
        <Row style={{ gap: 5 }}>
          <ThemedText type="subHeader">
            {type === "Commercial" ? "Full Space" : "Full House"}:
          </ThemedText>
          <AntDesign name="check" size={21} color={green} />
        </Row>
      )}
    </Row>
  );
};

export default RoomsToRent;
