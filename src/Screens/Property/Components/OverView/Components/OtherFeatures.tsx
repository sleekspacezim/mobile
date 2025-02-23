import { StyleSheet } from "react-native";
import React from "react";
import {
  AntDesign,
  FontAwesome,
  Foundation,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import Row from "@/src/Components/Row/Row";
import IconContainer from "@/src/Components/IconContainer/IconContainer";
import { iconSize, rowContainerStyles } from "../../Shared/Styles";
import { green, primary, red } from "@/src/Theme/Colors";
import ThemedText from "@/src/Components/ThemedText/ThemedText";

type Props = {
  header:
    | "Painted"
    | "Has Ceiling"
    | "Tiled"
    | "Plustered"
    | "Has Borehole"
    | "Pool"
    | "Paved";
  property: boolean;
};

const OtherFeatures: React.FC<Props> = ({ property, header }) => {
  const icon = () => {
    if (header === "Pool")
      return <MaterialIcons name="pool" size={iconSize} color={primary} />;
    else if (header === "Painted")
      return (
        <MaterialCommunityIcons
          name="format-paint"
          size={iconSize}
          color={primary}
        />
      );
    else if (header === "Has Borehole")
      return (
        <MaterialCommunityIcons
          name="water-well"
          size={iconSize}
          color={primary}
        />
      );
    else if (header === "Has Ceiling")
      return (
        <MaterialCommunityIcons
          name="home-roof"
          size={iconSize}
          color={primary}
        />
      );
    else if (header === "Paved")
      return (
        <MaterialCommunityIcons
          name="floor-plan"
          size={iconSize}
          color={primary}
        />
      );
    else if (header === "Plustered")
      return <Foundation name="paint-bucket" size={iconSize} color={primary} />;
    else
      return (
        <MaterialCommunityIcons
          name="apps-box"
          size={iconSize}
          color={primary}
        />
      );
  };
  return (
    <Row style={rowContainerStyles.rowContainer}>
      <IconContainer>{icon()}</IconContainer>
      <Row style={{ gap: 5 }}>
        <ThemedText type="subHeader">{`${header}:`}</ThemedText>
        {property ? (
          <AntDesign name="check" size={21} color={green} />
        ) : (
          <FontAwesome name="remove" size={21} color={red} />
        )}
      </Row>
    </Row>
  );
};

export default OtherFeatures;

const styles = StyleSheet.create({});
