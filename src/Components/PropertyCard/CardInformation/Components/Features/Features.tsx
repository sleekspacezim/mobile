import { View } from "react-native";
import React from "react";
import {
  Ionicons,
  MaterialIcons,
  AntDesign,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import RegularText from "@/src/Components/RegularText/RegularText";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { green, primary, red } from "@/src/Theme/Colors";
import IconContainer from "../../../../IconContainer/IconContainer";
import { iconSize } from "../Shared/Contants";
import { PropertyTypesEnum } from "@/src/Utils/Constants";

type Props = {
  isFullHouseOrSpace?: boolean;
  featureOne: number | string;
  featureTwo: number | string;
  sizeNumber: number | string;
  dimension: string;
  featureOneText: string;
  featureTwoText: string;
  propertyType: IPropertyType;
};

const Features: React.FC<Props> = ({
  isFullHouseOrSpace,
  featureOne,
  featureOneText,
  featureTwo,
  featureTwoText,
  dimension,
  sizeNumber,
  propertyType,
}) => {
  return (
    <Row style={{ justifyContent: "space-between" }}>
      {propertyType !== PropertyTypesEnum.Stands &&
        propertyType !== PropertyTypesEnum.Land && (
          <View style={{ alignItems: "center", flexDirection: "column" }}>
            <IconContainer>
              {isFullHouseOrSpace ? (
                <Ionicons name="home-outline" size={iconSize} color={primary} />
              ) : (
                <Ionicons name="bed-outline" size={iconSize} color={primary} />
              )}
            </IconContainer>
            <Row style={{ gap: 5 }}>
              <RegularText>
                {isFullHouseOrSpace ? "" : featureOne === 0 ? "--" : featureOne}
              </RegularText>
              <ThemedText type="regular">{featureOneText}</ThemedText>
            </Row>
          </View>
        )}
      {propertyType === PropertyTypesEnum.Stands && (
        <View style={{ alignItems: "center", flexDirection: "column" }}>
          <IconContainer>
            <FontAwesome6
              name="person-digging"
              size={iconSize}
              color={primary}
            />
          </IconContainer>
          <Row style={{ gap: 5 }}>
            <ThemedText type="regular">{featureOneText}</ThemedText>
            <RegularText>
              {featureOne === "isServiced" ? (
                <AntDesign name="check" size={20} color={green} />
              ) : (
                <AntDesign name="close" size={20} color={red} />
              )}
            </RegularText>
          </Row>
        </View>
      )}
      {propertyType === PropertyTypesEnum.Land && (
        <View style={{ alignItems: "center", flexDirection: "column" }}>
          <IconContainer>
            <FontAwesome6
              name="people-arrows"
              size={iconSize}
              color={primary}
            />
          </IconContainer>
          <Row style={{ gap: 5 }}>
            <ThemedText type="regular">{featureOneText}</ThemedText>
            <RegularText>
              {featureOne === "negotiable" ? (
                <AntDesign name="check" size={20} color={green} />
              ) : (
                <AntDesign name="close" size={20} color={red} />
              )}
            </RegularText>
          </Row>
        </View>
      )}
      {propertyType !== PropertyTypesEnum.Land && (
        <View style={{ alignItems: "center", flexDirection: "column" }}>
          <IconContainer>
            <MaterialIcons
              name="meeting-room"
              size={iconSize}
              color={primary}
            />
          </IconContainer>
          <Row style={{ gap: 5 }}>
            <RegularText>{featureTwo}</RegularText>
            <ThemedText type="regular">{featureTwoText}</ThemedText>
          </Row>
        </View>
      )}
      {propertyType === PropertyTypesEnum.Land && (
        <View style={{ alignItems: "center", flexDirection: "column" }}>
          <IconContainer>
            <MaterialCommunityIcons
              name="water-pump"
              size={iconSize}
              color={primary}
            />
          </IconContainer>
          <Row style={{ gap: 5 }}>
            <ThemedText type="regular">{featureTwoText}</ThemedText>
            <RegularText>
              {featureOne === "hasWater" ? (
                <AntDesign name="check" size={20} color={green} />
              ) : (
                <AntDesign name="close" size={20} color={red} />
              )}
            </RegularText>
          </Row>
        </View>
      )}
      <View style={{ alignItems: "center", flexDirection: "column" }}>
        <IconContainer>
          <AntDesign name="appstore-o" size={iconSize} color={primary} />
        </IconContainer>
        <Row style={{ gap: 5 }}>
          <ThemedText type="regular">Size</ThemedText>
          <RegularText>{`${
            sizeNumber === 0 ? "--" : sizeNumber
          } ${dimension}`}</RegularText>
        </Row>
      </View>
    </Row>
  );
};

export default Features;
