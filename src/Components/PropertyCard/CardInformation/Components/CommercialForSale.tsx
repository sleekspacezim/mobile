import { View } from "react-native";
import React from "react";
import {
  AntDesign,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

import { ICommercialPropertyForSaleWithManager } from "@/src/GlobalTypes/Property/Commercial/ForSaleTypes";
import CardInformation from "../CardInformation";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import Row from "@/src/Components/Row/Row";
import ManagerImage from "./ManagerImage/ManagerImage";
import NameRentOrPrice from "./NameRentOrPrice/NameRentOrPrice";
import TypeDotsAndFavorite from "./TypeDotsAndFavorite/TypeDotsAndFavorite";
import useNavigateToProperty from "../../Hooks/useNavigateToProperty";
import { cardInfoStyles } from "./Shared/styles";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { green, primary, red } from "@/src/Theme/Colors";
import IconContainer from "../../../IconContainer/IconContainer";
import { iconSize } from "./Shared/Contants";
import RegularText from "@/src/Components/RegularText/RegularText";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import PostTimeAndStatus from "./PostTimeAndStatus/PostTimeAndStatus";
import Location from "./PropertyLocation/Location";
import { processSizeDimensions } from "./Shared/Funcs";

type Props = {
  property: ICommercialPropertyForSaleWithManager;
  isOnfavoritesScreen?: boolean;
  setTotalProperties?:React.Dispatch<React.SetStateAction<number>>
};

const CommercialForSaleInformation: React.FC<Props> = ({
  isOnfavoritesScreen,
  setTotalProperties,
  property: {
    id,
    postedTime,
    yearBuilt,
    isNegotiable,
    type,
    currency,
    price,
    sizeNumber,
    sizeDimensions,
    numberOfRooms,
    isFavorite,
    managerId,
    uniqueId,
    status,
    manager: {
      profilePicture: { uri },
      name,
      userId,
    },
    propertyLocation: { displayName },
  },
}) => {
  const { navigateToProperty } = useNavigateToProperty(
    PropertyTypesEnum.CommercialForSale,
    id
  );
  const { details, btnContainer, infoContainer } = cardInfoStyles;

  const processYearBuiltOrTotalRooms = () => {
    if (type === "Flat" || type === "Building") {
      if (numberOfRooms === 0) return "--";
      else return numberOfRooms;
    } else {
      if (yearBuilt === 0) return "--";
      else return yearBuilt;
    }
  };

  return (
    <CardInformation>
      <View>
        <Row style={{ gap: 5 }}>
          <ManagerImage uri={uri} />
          <View style={{ flexDirection: "column", flex: 1 }}>
            <TypeDotsAndFavorite
              isFavorite={isFavorite}
              id={id}
              userId={userId}
              propertyType={PropertyTypesEnum.CommercialForSale}
              managerId={managerId}
              type={type}
              propertyUniqueId={uniqueId}
              setTotalProperties={setTotalProperties}
            />
            <NameRentOrPrice
              name={name}
              type="sale"
              currency={currency}
              amount={price}
            />
          </View>
        </Row>
      </View>
      <View style={infoContainer}>
        <Row style={{ justifyContent: "space-between" }}>
          <View style={{ alignItems: "center", flexDirection: "column" }}>
            <IconContainer>
              <FontAwesome6
                name="people-arrows"
                size={iconSize}
                color={primary}
              />
            </IconContainer>
            <Row style={{ gap: 5 }}>
              <ThemedText type="regular">Negotiable</ThemedText>
              <RegularText>
              {isNegotiable ? (
                <AntDesign name="check" size={20} color={green} />
              ) : (
                <AntDesign name="close" size={20} color={red} />
              )}
            </RegularText>
            </Row>
          </View>
          <View style={{ alignItems: "center", flexDirection: "column" }}>
            <IconContainer>
              {type === "Flat" || type === "Building" ? (
                <MaterialIcons
                  name="meeting-room"
                  size={iconSize}
                  color={primary}
                />
              ) : (
                <Ionicons
                  name="calendar-number-outline"
                  size={iconSize}
                  color={primary}
                />
              )}
            </IconContainer>
            <Row style={{ gap: 5 }}>
              {type !== "Flat" && type !== "Building" && (
                <ThemedText type="regular">{"Year Built"}</ThemedText>
              )}
              <RegularText>{processYearBuiltOrTotalRooms()}</RegularText>
              {(type === "Flat" || type === "Building") && (
                <ThemedText type="regular">{"Total rooms"}</ThemedText>
              )}
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
              } ${processSizeDimensions(sizeDimensions,sizeNumber)}`}</RegularText>
            </Row>
          </View>
        </Row>
        <Location displayName={displayName} />
        <View style={details}>
          <PostTimeAndStatus status={status} postedTime={postedTime} />
          <View style={btnContainer}>
            <CustomButton title="view" onPressFunc={navigateToProperty} />
          </View>
        </View>
      </View>
    </CardInformation>
  );
};

export default CommercialForSaleInformation;
