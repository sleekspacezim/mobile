import { View } from "react-native";
import React from "react";

import { IResidentialRentalPropertyWithManager } from "@/src/GlobalTypes/Property/Residential/RentalTypes";
import Row from "@/src/Components/Row/Row";
import { red } from "@/src/Theme/Colors";
import ManagerImage from "./ManagerImage/ManagerImage";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import CardInformation from "../CardInformation";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import useNavigateToProperty from "../../Hooks/useNavigateToProperty";
import Location from "./PropertyLocation/Location";
import TypeDotsAndFavorite from "./TypeDotsAndFavorite/TypeDotsAndFavorite";
import NameRentOrPrice from "./NameRentOrPrice/NameRentOrPrice";
import Features from "./Features/Features";
import PostTimeAndStatus from "./PostTimeAndStatus/PostTimeAndStatus";
import { cardInfoStyles } from "./Shared/styles";

type Props = {
  property: IResidentialRentalPropertyWithManager;
  isOnfavoritesScreen?: boolean;
  setTotalProperties?:React.Dispatch<React.SetStateAction<number>>
};

const ResidentialRentalsInformation: React.FC<Props> = ({
  isOnfavoritesScreen,
  setTotalProperties,
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
      userId,
    },
    propertyLocation: { displayName },
  },
}) => {
  const { navigateToProperty } = useNavigateToProperty(
    PropertyTypesEnum.ResidentialRentals,
    id
  );
  const {details,btnContainer,infoContainer} = cardInfoStyles
  
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
    if (numberOfRooms === 1) return "Total room";
    else return "Total rooms";
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
              propertyType={PropertyTypesEnum.ResidentialRentals}
              managerId={managerId}
              type={type}
              setTotalProperties={setTotalProperties}
            />
            <NameRentOrPrice
              name={name}
              type="rental"
              currency={currency}
              amount={rentAmount}
            />
          </View>
        </Row>
      </View>
      <View style={infoContainer}>
        <Features
          featureOne={numberOfRoomsToLet}
          featureOneText={processRoomsText()}
          featureTwo={numberOfRooms}
          featureTwoText={processTotalRoomsText()}
          propertyType={PropertyTypesEnum.ResidentialRentals}
          sizeNumber={sizeNumber}
          dimension={processSizeDimensions()}
          isFullHouseOrSpace={isFullHouse}
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

export default ResidentialRentalsInformation;
