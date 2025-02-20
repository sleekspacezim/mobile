import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ICommercialRentalPropertyWithManager } from '@/src/GlobalTypes/Property/Commercial/RentalTypes'
import { PropertyTypesEnum } from '@/src/Utils/Constants';
import useNavigateToProperty from '../../Hooks/useNavigateToProperty';
import { cardInfoStyles } from './Shared/styles';
import CardInformation from '../CardInformation';
import Row from '@/src/Components/Row/Row';
import ManagerImage from './ManagerImage/ManagerImage';
import NameRentOrPrice from './NameRentOrPrice/NameRentOrPrice';
import TypeDotsAndFavorite from './TypeDotsAndFavorite/TypeDotsAndFavorite';
import CustomButton from '@/src/Components/Buttons/Custom/CustomButton';
import Features from './Features/Features';
import PostTimeAndStatus from './PostTimeAndStatus/PostTimeAndStatus';
import Location from './PropertyLocation/Location';
import { processSizeDimensions } from './Shared/Funcs';

type Props = {
  property: ICommercialRentalPropertyWithManager;
  isOnfavoritesScreen?: boolean;
  setTotalProperties?:React.Dispatch<React.SetStateAction<number>>
}

const CommercialRentalsInformation:React.FC<Props> = ({
  isOnfavoritesScreen,
  setTotalProperties,
  property: {
    id,
    uniqueId,
    postedTime,
    numberOfRoomsToLet,
    type,
    currency,
    rentAmount,
    sizeNumber,
    sizeDimensions,
    numberOfRooms,
    isFullSpace,
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
      PropertyTypesEnum.CommercialRentals,
      id
    );
    const {details,btnContainer,infoContainer} = cardInfoStyles
  
    const processRoomsText = () => {
      if (isFullSpace) return "Full Space";
      else {
        if (numberOfRoomsToLet === 1) return "Room to rent";
        else return "Rooms to rent";
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
              propertyType={PropertyTypesEnum.CommercialRentals}
              managerId={managerId}
              type={type}
              propertyUniqueId={uniqueId}
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
          featureTwo={type}
          featureTwoText={"Type"}
          propertyType={PropertyTypesEnum.CommercialRentals}
          sizeNumber={sizeNumber}
          dimension={processSizeDimensions(sizeDimensions,sizeNumber)}
          isFullHouseOrSpace={isFullSpace}
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
  )
}

export default CommercialRentalsInformation