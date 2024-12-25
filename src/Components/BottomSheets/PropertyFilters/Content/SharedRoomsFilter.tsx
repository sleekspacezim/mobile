import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";

import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { gray, lighterPrimary, primary } from "@/src/Theme/Colors";
import { IPropertyFilter } from "@/src/Screens/Home/Types/Types";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import { usePropertyFiltersContext } from "@/src/Context/PropertyFiltersContext";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import {
  bathRoomsFilterList,
  bedRoomsFilterList,
  roomsToRentFilterList,
  totalRoomsFilterList,
} from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Contants";
import ResetFilterButton from "@/src/Components/Buttons/ResetFilter/ResetFilterButton";
import { sharedRoomsFilterStyles } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Styles";

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
    setBathroomsFilter,
    setBedroomsFilter,
    setRoomsToRentFilter,
    setTotalRoomsFilter,
  } = usePropertyFiltersContext();
  const [selectedTotalNumberOfRooms, setSelectedTotalNumberOfRooms] =
    useState<string>(totalRoomsFilter.figure);
  const [selectedNumberOfRoomsToRent, setSelectedNumberOfRoomsToRent] =
    useState<string>(roomsToRentFilter.figure);
  const [selectedNumberOfBathrooms, setSelectedNumberOfBathrooms] =
    useState<string>(bathroomsFilter.figure);
  const [selectedNumberOfBedrooms, setSelectedNumberOfBedrooms] =
    useState<string>(bedroomsFilter.figure);
  const activePropertyType = useAppSelector(
    (state) => state.activePropertyType.value
  );

  const handleFilterReset = () => {
    if (filterType === "Rooms to rent") {
      setSelectedNumberOfRoomsToRent("");
      setRoomsToRentFilter({
        isActive: false,
        figure: "",
        propertyType: "",
      });
    } else if (filterType === "Bathrooms") {
      setSelectedNumberOfBathrooms("");
      setBathroomsFilter({
        isActive: false,
        figure: "",
        propertyType: "",
      });
    } else if (filterType === "Bedrooms") {
      setSelectedNumberOfBedrooms("");
      setBedroomsFilter({
        isActive: false,
        figure: "",
        propertyType: "",
      });
    } else {
      setSelectedTotalNumberOfRooms("");
      setTotalRoomsFilter({
        isActive: false,
        figure: "",
        propertyType: "",
      });
    }
    closeBottomSheet();
  };

  const handleApplyFilter = () => {
    if (filterType === "Rooms to rent") {
      setRoomsToRentFilter({
        isActive: true,
        figure: selectedNumberOfRoomsToRent,
        propertyType: activePropertyType as
          | ""
          | PropertyTypesEnum.ResidentialRentals
          | PropertyTypesEnum.CommercialRentals,
      });
    } else if (filterType === "Bathrooms") {
      setBathroomsFilter({
        isActive: true,
        figure: selectedNumberOfBathrooms,
        propertyType: activePropertyType as
          | ""
          | PropertyTypesEnum.ResidentialForSale
          | PropertyTypesEnum.ResidentialRentals,
      });
    } else if (filterType === "Bedrooms") {
      setBedroomsFilter({
        isActive: true,
        figure: selectedNumberOfBedrooms,
        propertyType: activePropertyType as
          | ""
          | PropertyTypesEnum.ResidentialForSale
          | PropertyTypesEnum.ResidentialRentals,
      });
    } else {
      setTotalRoomsFilter({
        isActive: true,
        figure: selectedTotalNumberOfRooms,
        propertyType: activePropertyType as
          | ""
          | PropertyTypesEnum.ResidentialRentals
          | PropertyTypesEnum.ResidentialForSale
          | PropertyTypesEnum.CommercialRentals
          | PropertyTypesEnum.CommercialForSale,
      });
    }
    closeBottomSheet();
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
            totalRoomsFilter.figure &&
            selectedTotalNumberOfRooms && (
              <ResetFilterButton handleResetFunc={handleFilterReset} />
            )}
          {filterType === "Rooms to rent" &&
            roomsToRentFilter.figure &&
            selectedNumberOfRoomsToRent && (
              <ResetFilterButton handleResetFunc={handleFilterReset} />
            )}
          {filterType === "Bedrooms" &&
            bedroomsFilter.figure &&
            selectedNumberOfBedrooms && (
              <ResetFilterButton handleResetFunc={handleFilterReset} />
            )}
          {filterType === "Bathrooms" &&
            bathroomsFilter.figure &&
            selectedNumberOfBathrooms && (
              <ResetFilterButton handleResetFunc={handleFilterReset} />
            )}
        </View>
      </Row>
      <View style={sharedRoomsFilterStyles.roomContainer}>
        {filterType === "Rooms to rent" &&
          roomsToRentFilterList.map((numberOfRooms) => (
            <TouchableOpacity
              style={[
                sharedRoomsFilterStyles.room,
                {
                  backgroundColor:
                    selectedNumberOfRoomsToRent === numberOfRooms
                      ? lighterPrimary
                      : "transparent",
                  borderColor:
                    selectedNumberOfRoomsToRent === numberOfRooms
                      ? primary
                      : gray,
                },
              ]}
              key={numberOfRooms}
              onPress={() => setSelectedNumberOfRoomsToRent(numberOfRooms)}
            >
              <Text
                style={[
                  sharedRoomsFilterStyles.roomText,
                  {
                    color:
                      selectedNumberOfRoomsToRent === numberOfRooms
                        ? primary
                        : gray,
                  },
                ]}
              >
                {numberOfRooms}
              </Text>
            </TouchableOpacity>
          ))}

        {filterType === "Bedrooms" &&
          bedRoomsFilterList.map((numberOfRooms) => (
            <TouchableOpacity
              style={[
                sharedRoomsFilterStyles.room,
                {
                  backgroundColor:
                    selectedNumberOfBedrooms === numberOfRooms
                      ? lighterPrimary
                      : "transparent",
                  borderColor:
                    selectedNumberOfBedrooms === numberOfRooms ? primary : gray,
                },
              ]}
              key={numberOfRooms}
              onPress={() => setSelectedNumberOfBedrooms(numberOfRooms)}
            >
              <Text
                style={[
                  sharedRoomsFilterStyles.roomText,
                  {
                    color:
                      selectedNumberOfBedrooms === numberOfRooms
                        ? primary
                        : gray,
                  },
                ]}
              >
                {numberOfRooms}
              </Text>
            </TouchableOpacity>
          ))}

        {filterType === "Bathrooms" &&
          bathRoomsFilterList.map((numberOfRooms) => (
            <TouchableOpacity
              style={[
                sharedRoomsFilterStyles.room,
                {
                  backgroundColor:
                    selectedNumberOfBathrooms === numberOfRooms
                      ? lighterPrimary
                      : "transparent",
                  borderColor:
                    selectedNumberOfBathrooms === numberOfRooms
                      ? primary
                      : gray,
                },
              ]}
              key={numberOfRooms}
              onPress={() => setSelectedNumberOfBathrooms(numberOfRooms)}
            >
              <Text
                style={[
                  sharedRoomsFilterStyles.roomText,
                  {
                    color:
                      selectedNumberOfBathrooms === numberOfRooms
                        ? primary
                        : gray,
                  },
                ]}
              >
                {numberOfRooms}
              </Text>
            </TouchableOpacity>
          ))}

        {filterType === "Total rooms" &&
          totalRoomsFilterList.map((numberOfRooms) => (
            <TouchableOpacity
              style={[
                sharedRoomsFilterStyles.room,
                {
                  backgroundColor:
                    selectedTotalNumberOfRooms === numberOfRooms
                      ? lighterPrimary
                      : "transparent",
                  borderColor:
                    selectedTotalNumberOfRooms === numberOfRooms
                      ? primary
                      : gray,
                },
              ]}
              key={numberOfRooms}
              onPress={() => setSelectedTotalNumberOfRooms(numberOfRooms)}
            >
              <Text
                style={[
                  sharedRoomsFilterStyles.roomText,
                  {
                    color:
                      selectedTotalNumberOfRooms === numberOfRooms
                        ? primary
                        : gray,
                  },
                ]}
              >
                {numberOfRooms}
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
