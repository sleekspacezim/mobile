import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { ILandPropertyWithManager } from "@/src/GlobalTypes/Property/Land/LandTypes";
import CardInformation from "../CardInformation";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import useNavigateToProperty from "../../Hooks/useNavigateToProperty";
import { cardInfoStyles } from "./Shared/styles";
import Row from "@/src/Components/Row/Row";
import ManagerImage from "./ManagerImage/ManagerImage";
import NameRentOrPrice from "./NameRentOrPrice/NameRentOrPrice";
import TypeDotsAndFavorite from "./TypeDotsAndFavorite/TypeDotsAndFavorite";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import { red } from "@/src/Theme/Colors";
import Features from "./Features/Features";
import PostTimeAndStatus from "./PostTimeAndStatus/PostTimeAndStatus";
import Location from "./PropertyLocation/Location";

type Props = {
  property: ILandPropertyWithManager;
  isOnfavoritesScreen?: boolean;
  setTotalProperties?:React.Dispatch<React.SetStateAction<number>>
};

const LandInformation: React.FC<Props> = ({
  isOnfavoritesScreen,
  setTotalProperties,
  property: {
    id,
    postedTime,
    price,
    type,
    currency,
    sizeNumber,
    sizeDimensions,
    isNegotiable,
    isFavorite,
    hasWater,
    managerId,
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
    PropertyTypesEnum.Land,
    id
  );
  const { details, btnContainer, infoContainer } = cardInfoStyles;

  const processSizeDimensions = () => {
    if (sizeDimensions === "Acres") {
      if (sizeNumber === 1) return "Acre";
      else return sizeDimensions;
    }
    if (sizeDimensions === "Square meters") return "m²";
    if (sizeDimensions === "Hectares") return "Ha";
    else return sizeDimensions;
  };

  const processHasWater = () => {
    if (hasWater) return "hasWater";
    else {
      return "noWater";
    }
  };

  const processNegotiability = () => {
    if (isNegotiable) return "negotiable";
    else {
      return "nonNegotiable";
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
              propertyType={PropertyTypesEnum.Land}
              managerId={managerId}
              type={type}
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
        <Features
          featureOne={processNegotiability()}
          featureOneText={"Negotiable"}
          featureTwo={processHasWater()}
          featureTwoText={"water"}
          propertyType={PropertyTypesEnum.Land}
          sizeNumber={sizeNumber}
          dimension={processSizeDimensions()}
        />
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

export default LandInformation;
