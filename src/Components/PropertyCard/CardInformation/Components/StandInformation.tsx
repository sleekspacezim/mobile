import { View } from "react-native";
import React from "react";

import { IStandPropertyWithManager } from "@/src/GlobalTypes/Property/Stand/StandTypes";
import CardInformation from "../CardInformation";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import Row from "@/src/Components/Row/Row";
import ManagerImage from "./ManagerImage/ManagerImage";
import NameRentOrPrice from "./NameRentOrPrice/NameRentOrPrice";
import TypeDotsAndFavorite from "./TypeDotsAndFavorite/TypeDotsAndFavorite";
import { cardInfoStyles } from "./Shared/styles";
import useNavigateToProperty from "../../Hooks/useNavigateToProperty";
import Features from "./Features/Features";
import Location from "./PropertyLocation/Location";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import { red } from "@/src/Theme/Colors";
import PostTimeAndStatus from "./PostTimeAndStatus/PostTimeAndStatus";
import { processSizeDimensions } from "./Shared/Funcs";

type Props = {
  property: IStandPropertyWithManager;
  isOnfavoritesScreen?: boolean;
  setTotalProperties?:React.Dispatch<React.SetStateAction<number>>
};

const StandInformation: React.FC<Props> = ({
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
    isFavorite,
    managerId,
    isServiced,
    uniqueId,
    level,
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
    PropertyTypesEnum.Stands,
    id
  );
  const { details, btnContainer, infoContainer } = cardInfoStyles;

  const processServiced = () => {
    if (isServiced) return "isServiced";
    else {
      return "notServiced";
    }
  };

  const processLevel = () => {
    if (!level) return "--";
    else return level;
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
              propertyType={PropertyTypesEnum.Stands}
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
        <Features
          featureOne={processServiced()}
          featureOneText={"serviced"}
          featureTwo={processLevel()}
          featureTwoText={"level"}
          propertyType={PropertyTypesEnum.Stands}
          sizeNumber={sizeNumber}
          dimension={processSizeDimensions(sizeDimensions,sizeNumber)}
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

export default StandInformation;
