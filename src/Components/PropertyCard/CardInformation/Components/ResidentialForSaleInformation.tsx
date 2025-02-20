import { View } from "react-native";
import React from "react";

import { IResidentialPropertyForSaleWithManager } from "@/src/GlobalTypes/Property/Residential/ForSaleTypes";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import useNavigateToProperty from "../../Hooks/useNavigateToProperty";
import CardInformation from "../CardInformation";
import Row from "@/src/Components/Row/Row";
import ManagerImage from "./ManagerImage/ManagerImage";
import NameRentOrPrice from "./NameRentOrPrice/NameRentOrPrice";
import TypeDotsAndFavorite from "./TypeDotsAndFavorite/TypeDotsAndFavorite";
import { cardInfoStyles } from "./Shared/styles";
import Location from "./PropertyLocation/Location";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import { red } from "@/src/Theme/Colors";
import Features from "./Features/Features";
import PostTimeAndStatus from "./PostTimeAndStatus/PostTimeAndStatus";
import { processSizeDimensions } from "./Shared/Funcs";

type Props = {
  property: IResidentialPropertyForSaleWithManager;
  isOnfavoritesScreen?: boolean;
  setTotalProperties?:React.Dispatch<React.SetStateAction<number>>
};

const ResidentialForSaleInformation: React.FC<Props> = ({
  isOnfavoritesScreen,
  setTotalProperties,
  property: {
    id,
    postedTime,
    type,
    currency,
    price,
    uniqueId,
    sizeNumber,
    bedrooms,
    sizeDimensions,
    numberOfRooms,
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
    PropertyTypesEnum.ResidentialForSale,
    id
  );
  const { details, btnContainer, infoContainer } = cardInfoStyles;

  const processBedroomsText = () => {
    if (bedrooms === 1) return "Bedroom";
    else return "Bedrooms";
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
              propertyType={PropertyTypesEnum.ResidentialForSale}
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
          featureOne={bedrooms}
          featureOneText={processBedroomsText()}
          featureTwo={numberOfRooms}
          featureTwoText={processTotalRoomsText()}
          propertyType={PropertyTypesEnum.ResidentialForSale}
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

export default ResidentialForSaleInformation;
