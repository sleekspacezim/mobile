import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import millify from "millify";
import {
  AntDesign,
  EvilIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { IResidentialRentalPropertyWithManager } from "@/src/GlobalTypes/Property/Residential/RentalTypes";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import Row from "@/src/Components/Row/Row";
import { primary, red } from "@/src/Theme/Colors";
import IconContainer from "./IconContainer/IconContainer";
import RegularText from "@/src/Components/RegularText/RegularText";
import { family, small } from "@/src/Theme/Font";
import ManagerImage from "./ManagerImage/ManagerImage";
import ThreeDots from "../../../ThreeDots/ThreeDots";
import { shortenString } from "@/src/Utils/Funcs";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import CardInformation from "../CardInformation";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import FavoriteContainer from "./FavoriteContainer/FavoriteContainer";
import useNavigateToProperty from "../../Hooks/useNavigateToProperty";

type Props = {
  property: IResidentialRentalPropertyWithManager;
  isOnfavoritesScreen?: boolean;
};

const ResidentialRentalsInformation: React.FC<Props> = ({
  isOnfavoritesScreen,
  property: {
    id,
    postedTime,
    numberOfRoomsToLet,
    type,
    currency,
    rentAmount,
    sizeNumber,
    sizeDimensions,
    numberOfRooms,
    isFullHouse,
    isFavorite,
    managerId,
    status,
    manager: {
      profilePicture: { uri },
      name,
      userId
    },
    propertyLocation: { displayName },
  },
}) => {
  const iconSize = 22;
  const theme = useAppSelector((state) => state.theme.value);
  const user = useAppSelector((state)=>state.user.value)
  const { navigateToProperty } = useNavigateToProperty(
    PropertyTypesEnum.ResidentialRentals,
    id
  );
  const processSizeDimensions = () => {
    if (sizeDimensions === "Acres") {
      if (sizeNumber === 1) return "Acre";
      else return sizeDimensions;
    }
    if (sizeDimensions === "Square meters") return "m²";
    if (sizeDimensions === "Hectares") return "Ha";
    else return sizeDimensions;
  };

  const processRoomsText = () => {
    if (isFullHouse) return "Full House";
    else {
      if (numberOfRoomsToLet === 1) return "Room to rent";
      else return "Rooms to rent";
    }
  };

  const processTotalRoomsText = () => {
    if (numberOfRooms === 1) return "Total Rooms";
    else return "Total rooms";
  };

  return (
    <CardInformation>
      <View>
        <Row style={{ gap: 5 }}>
          <ManagerImage uri={uri} />
          <View style={{ flexDirection: "column", flex: 1 }}>
            <Row
              style={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <ThemedText type="subHeader">{type}</ThemedText>
              <Row style={{ gap: 5, alignItems: "center" }}>
                {user.id !== userId && <FavoriteContainer
                  propertyId={id}
                  isPropertyFavorite={isFavorite}
                  propertyType={PropertyTypesEnum.ResidentialRentals}
                />}
                <ThreeDots
                  propertyId={id}
                  managerId={managerId}
                  propertyType={PropertyTypesEnum.ResidentialRentals}
                  type="property"
                  isFavorite={isFavorite}
                />
              </Row>
            </Row>
            <Row
              style={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <RegularText>{shortenString(name, 22)}</RegularText>
              <Text style={styles.rent}>{`${currency}${millify(
                rentAmount
              )}/month`}</Text>
            </Row>
          </View>
        </Row>
      </View>
      <View style={styles.infoContainer}>
        <Row style={{ justifyContent: "space-between" }}>
          <View style={{ alignItems: "center", flexDirection: "column" }}>
            <IconContainer>
              {isFullHouse ? (
                <Ionicons name="home-outline" size={iconSize} color={primary} />
              ) : (
                <Ionicons name="bed-outline" size={iconSize} color={primary} />
              )}
            </IconContainer>
            <Row style={{ gap: 5 }}>
              <RegularText>{isFullHouse ? "" : numberOfRoomsToLet}</RegularText>
              <ThemedText type="regular">{processRoomsText()}</ThemedText>
            </Row>
          </View>
          <View style={{ alignItems: "center", flexDirection: "column" }}>
            <IconContainer>
              <MaterialIcons
                name="meeting-room"
                size={iconSize}
                color={primary}
              />
            </IconContainer>
            <Row style={{ gap: 5 }}>
              <RegularText>{numberOfRooms}</RegularText>
              <ThemedText type="regular">{processTotalRoomsText()}</ThemedText>
            </Row>
          </View>
          <View style={{ alignItems: "center", flexDirection: "column" }}>
            <IconContainer>
              <AntDesign name="appstore-o" size={iconSize} color={primary} />
            </IconContainer>
            <Row style={{ gap: 5 }}>
              <ThemedText type="regular">Size</ThemedText>
              <RegularText>{`${
                sizeNumber === 0 ? "--" : sizeNumber
              } ${processSizeDimensions()}`}</RegularText>
            </Row>
          </View>
        </Row>
        <Row style={{ gap: 5 }}>
          <IconContainer>
            <EvilIcons name="location" size={iconSize} color={primary} />
          </IconContainer>
          <RegularText style={{ flex: 1, flexWrap: "wrap" }}>
            {displayName}
          </RegularText>
        </Row>
        <View style={styles.details}>
          <Row
            style={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Row style={{ gap: 5 }}>
              <ThemedText type="regular" styles={{ fontStyle: "italic" }}>
                Posted:
              </ThemedText>
              <RegularText>{postedTime}</RegularText>
            </Row>
            {theme === "dark" ? (
              <ThemedText type="regular" styles={{ fontStyle: "italic" }}>
                {status}
              </ThemedText>
            ) : (
              <RegularText style={{ fontStyle: "italic" }}>
                {status}
              </RegularText>
            )}
          </Row>
          <View style={styles.btnContainer}>
            {isOnfavoritesScreen && (
              <CustomButton
                title="remove"
                color={red}
                onPressFunc={() => console.log(id)}
              />
            )}
            <CustomButton title="view" onPressFunc={navigateToProperty} />
          </View>
        </View>
      </View>
    </CardInformation>
  );
};

export default ResidentialRentalsInformation;

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "column",
    gap: 2,
    flex: 1,
    marginTop: 3,
  },
  details: {
    flexDirection: "column",
  },
  subContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    width: "100%",
  },
  rent: {
    fontFamily: family,
    fontSize: small,
    color: primary,
  },
  btnContainer: {
    flexDirection: "column",
    gap: 5,
  },
});
