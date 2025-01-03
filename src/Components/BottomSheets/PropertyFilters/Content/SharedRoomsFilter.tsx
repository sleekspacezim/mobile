import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";

import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { gray, lighterPrimary, primary } from "@/src/Theme/Colors";
import { IPropertyFilter } from "@/src/Screens/Home/Types/Types";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import {
  IBathroomsFilter,
  IBedroomsFilter,
  IRoomsToRentFilter,
  ITotalRoomsFilter,
  usePropertyFiltersContext,
} from "@/src/Context/PropertyFiltersContext";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import {
  activeOpacityOfTouchableOpacity,
  PropertyTypesEnum,
} from "@/src/Utils/Constants";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import {
  bathRoomsFilterList,
  bedRoomsFilterList,
  roomsToRentCommercialPropertyFilterList,
  roomsToRentResidentialPropertyFilterList,
  totalRoomsFilterList,
} from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Contants";
import ResetFilterButton from "@/src/Components/Buttons/ResetFilter/ResetFilterButton";
import { sharedRoomsFilterStyles } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Styles";
import useSharedRoomsFilterFuncs from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/FilterItem/Hooks/useSharedRoomsFilterFuncs";

type Props = {
  filterType: IPropertyFilter;
  closeBottomSheet: IVoidFunc;
};

const SharedRoomsFilter: React.FC<Props> = ({
  filterType,
  closeBottomSheet,
}) => {
  const {
    totalRoomsFilter,
    bathroomsFilter,
    bedroomsFilter,
    roomsToRentFilter,
  } = usePropertyFiltersContext();
  const [selectedTotalNumberOfRooms, setSelectedTotalNumberOfRooms] =
    useState<ITotalRoomsFilter>(totalRoomsFilter);
  const [selectedNumberOfRoomsToRent, setSelectedNumberOfRoomsToRent] =
    useState<IRoomsToRentFilter>(roomsToRentFilter);
  const [selectedNumberOfBathrooms, setSelectedNumberOfBathrooms] =
    useState<IBathroomsFilter>(bathroomsFilter);
  const [selectedNumberOfBedrooms, setSelectedNumberOfBedrooms] =
    useState<IBedroomsFilter>(bedroomsFilter);
  const activePropertyType = useAppSelector(
    (state) => state.activePropertyType.value
  );
  const {
    resetSharedRoomsFilter,
    applySharedRoomsFilter,
    handleSelectBathrooms,
    handleSelectBedrooms,
    handleSelectRoomsToRent,
    handleSelectTotalRooms,
    totalRoomsColor,
    bathRoomsColor,
    bedRoomsColor,
    roomsToRentColor,
  } = useSharedRoomsFilterFuncs(
    activePropertyType,
    selectedTotalNumberOfRooms,
    selectedNumberOfRoomsToRent,
    selectedNumberOfBathrooms,
    selectedNumberOfBedrooms,
    setSelectedNumberOfBathrooms,
    setSelectedNumberOfBedrooms,
    setSelectedNumberOfRoomsToRent,
    setSelectedTotalNumberOfRooms
  );

  const handleFilterReset = () => {
    resetSharedRoomsFilter();
    closeBottomSheet();
  };

  const handleApplyFilter = () => {
    applySharedRoomsFilter();
    closeBottomSheet();
  };

  const renderBedroomResetButton = () => {
    if (activePropertyType === PropertyTypesEnum.ResidentialForSale) {
      if (
        bedroomsFilter.residentialForsaleFigure &&
        selectedNumberOfBedrooms.residentialForsaleFigure
      )
        return true;
      else return false;
    } else {
      if (
        bedroomsFilter.residentialRentalsFigure &&
        selectedNumberOfBedrooms.residentialRentalsFigure
      )
        return true;
      else return false;
    }
  };

  const renderBathroomResetButton = () => {
    if (activePropertyType === PropertyTypesEnum.ResidentialForSale) {
      if (
        bathroomsFilter.residentialForsaleFigure &&
        selectedNumberOfBathrooms.residentialForsaleFigure
      )
        return true;
      else return false;
    } else {
      if (
        bathroomsFilter.residentialRentalsFigure &&
        selectedNumberOfBathrooms.residentialRentalsFigure
      )
        return true;
      else return false;
    }
  };

  const renderRoomsToRentResetButton = () => {
    if (activePropertyType === PropertyTypesEnum.CommercialRentals) {
      if (
        roomsToRentFilter.commercialRentalsFigure &&
        selectedNumberOfRoomsToRent.commercialRentalsFigure
      )
        return true;
      else return false;
    } else {
      if (
        roomsToRentFilter.residentialRentalsFigure &&
        selectedNumberOfRoomsToRent.residentialRentalsFigure
      )
        return true;
      else return false;
    }
  };

  const renderTotalRoomsResetButton = () => {
    if (activePropertyType === PropertyTypesEnum.ResidentialForSale) {
      if (
        totalRoomsFilter.residentialForsaleFigure &&
        selectedTotalNumberOfRooms.residentialForsaleFigure
      )
        return true;
      else return false;
    } else if (activePropertyType === PropertyTypesEnum.ResidentialRentals) {
      if (
        totalRoomsFilter.residentialRentalsFigure &&
        selectedTotalNumberOfRooms.residentialRentalsFigure
      )
        return true;
      else return false;
    } else if (activePropertyType === PropertyTypesEnum.CommercialForSale) {
      if (
        totalRoomsFilter.commercialForsaleFigure &&
        selectedTotalNumberOfRooms.commercialForsaleFigure
      )
        return true;
      else return false;
    } else {
      if (
        totalRoomsFilter.commercialRentalsFigure &&
        selectedTotalNumberOfRooms.commercialRentalsFigure
      )
        return true;
      else return false;
    }
  };

  const getRoomsToRent = () => {
    if (activePropertyType === PropertyTypesEnum.CommercialRentals)
      return roomsToRentCommercialPropertyFilterList;
    else return roomsToRentResidentialPropertyFilterList;
  };

  return (
    <View style={styles.container}>
      <Row style={styles.headerContainer}>
        <Row style={sharedRoomsFilterStyles.row}>
          {filterType === "Bedrooms" ? (
            <Ionicons name="bed" size={25} color={primary} />
          ) : filterType === "Bathrooms" ? (
            <FontAwesome name="bath" size={25} color={primary} />
          ) : (
            <MaterialIcons name="meeting-room" size={25} color={primary} />
          )}
          <ThemedText type="subHeader">{filterType}</ThemedText>
        </Row>
        <View style={{ height: 30 }}>
          {filterType === "Total rooms" &&
            renderTotalRoomsResetButton() &&
            selectedTotalNumberOfRooms && (
              <ResetFilterButton handleResetFunc={handleFilterReset} />
            )}
          {filterType === "Rooms to rent" &&
            renderRoomsToRentResetButton() &&
            selectedNumberOfRoomsToRent && (
              <ResetFilterButton handleResetFunc={handleFilterReset} />
            )}
          {filterType === "Bedrooms" && renderBedroomResetButton() && (
            <ResetFilterButton handleResetFunc={handleFilterReset} />
          )}
          {filterType === "Bathrooms" &&
            renderBathroomResetButton() &&
            selectedNumberOfBathrooms && (
              <ResetFilterButton handleResetFunc={handleFilterReset} />
            )}
        </View>
      </Row>
      <View style={sharedRoomsFilterStyles.roomContainer}>
        {filterType === "Rooms to rent" &&
          getRoomsToRent().map((numberOfRooms) => (
            <TouchableOpacity
              activeOpacity={activeOpacityOfTouchableOpacity}
              style={[
                sharedRoomsFilterStyles.room,
                {
                  backgroundColor: roomsToRentColor(
                    numberOfRooms,
                    lighterPrimary,
                    "transparent"
                  ),
                  borderColor: roomsToRentColor(numberOfRooms, primary, gray),
                },
              ]}
              key={numberOfRooms}
              onPress={() => handleSelectRoomsToRent(numberOfRooms)}
            >
              <Text
                style={[
                  sharedRoomsFilterStyles.roomText,
                  {
                    color: roomsToRentColor(numberOfRooms, primary, gray),
                  },
                ]}
              >
                {numberOfRooms === "8plus" ? "8+" : numberOfRooms}
              </Text>
            </TouchableOpacity>
          ))}

        {filterType === "Bedrooms" &&
          bedRoomsFilterList.map((numberOfRooms) => (
            <TouchableOpacity
              activeOpacity={activeOpacityOfTouchableOpacity}
              style={[
                sharedRoomsFilterStyles.room,
                {
                  backgroundColor: bedRoomsColor(
                    numberOfRooms,
                    lighterPrimary,
                    "transparent"
                  ),
                  borderColor: bedRoomsColor(numberOfRooms, primary, gray),
                },
              ]}
              key={numberOfRooms}
              onPress={() => handleSelectBedrooms(numberOfRooms)}
            >
              <Text
                style={[
                  sharedRoomsFilterStyles.roomText,
                  {
                    color: bedRoomsColor(numberOfRooms, primary, gray),
                  },
                ]}
              >
                {numberOfRooms === "8plus" ? "8+" : numberOfRooms}
              </Text>
            </TouchableOpacity>
          ))}

        {filterType === "Bathrooms" &&
          bathRoomsFilterList.map((numberOfRooms) => (
            <TouchableOpacity
              activeOpacity={activeOpacityOfTouchableOpacity}
              style={[
                sharedRoomsFilterStyles.room,
                {
                  backgroundColor: bathRoomsColor(
                    numberOfRooms,
                    lighterPrimary,
                    "transparent"
                  ),
                  borderColor: bathRoomsColor(numberOfRooms, primary, gray),
                },
              ]}
              key={numberOfRooms}
              onPress={() => handleSelectBathrooms(numberOfRooms)}
            >
              <Text
                style={[
                  sharedRoomsFilterStyles.roomText,
                  {
                    color: bathRoomsColor(numberOfRooms, primary, gray),
                  },
                ]}
              >
                {numberOfRooms === "8plus" ? "8+" : numberOfRooms}
              </Text>
            </TouchableOpacity>
          ))}

        {filterType === "Total rooms" &&
          totalRoomsFilterList.map((numberOfRooms) => (
            <TouchableOpacity
              activeOpacity={activeOpacityOfTouchableOpacity}
              style={[
                sharedRoomsFilterStyles.room,
                {
                  backgroundColor: totalRoomsColor(
                    numberOfRooms,
                    lighterPrimary,
                    "transparent"
                  ),
                  borderColor: totalRoomsColor(numberOfRooms, primary, gray),
                },
              ]}
              key={numberOfRooms}
              onPress={() => handleSelectTotalRooms(numberOfRooms)}
            >
              <Text
                style={[
                  sharedRoomsFilterStyles.roomText,
                  {
                    color: totalRoomsColor(numberOfRooms, primary, gray),
                  },
                ]}
              >
                {numberOfRooms === "8plus" ? "8+" : numberOfRooms}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
      <CustomButton title="Apply" onPressFunc={handleApplyFilter} />
    </View>
  );
};

export default SharedRoomsFilter;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
});
