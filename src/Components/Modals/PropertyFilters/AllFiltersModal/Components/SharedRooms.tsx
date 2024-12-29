import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { primary, lighterPrimary, gray } from "@/src/Theme/Colors";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Divider from "./Divider";
import { sharedRoomsFilterStyles } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Styles";
import {
  bathRoomsFilterList,
  bedRoomsFilterList,
  roomsToRentFilterList,
  totalRoomsFilterList,
} from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Contants";
import {
  IBathroomsFilter,
  IBedroomsFilter,
  IRoomsToRentFilter,
  ITotalRoomsFilter,
} from "@/src/Context/PropertyFiltersContext";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import useSharedRoomsFilterFuncs from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/FilterItem/Hooks/useSharedRoomsFilterFuncs";

type Props = {
  propertyType: IPropertyType;
  filterType: string;
  selectedTotalNumberOfRooms: ITotalRoomsFilter;
  selectedNumberOfRoomsToRent: IRoomsToRentFilter;
  selectedNumberOfBathrooms: IBathroomsFilter;
  selectedNumberOfBedrooms: IBedroomsFilter;
  setSelectedNumberOfBathrooms: React.Dispatch<
    React.SetStateAction<IBathroomsFilter>
  >;
  setSelectedNumberOfBedrooms: React.Dispatch<
    React.SetStateAction<IBedroomsFilter>
  >;
  setSelectedNumberOfRoomsToRent: React.Dispatch<
    React.SetStateAction<IRoomsToRentFilter>
  >;
  setSelectedTotalNumberOfRooms: React.Dispatch<
    React.SetStateAction<ITotalRoomsFilter>
  >;
};

const SharedRooms: React.FC<Props> = ({
  propertyType,
  filterType,
  selectedNumberOfBathrooms,
  selectedNumberOfBedrooms,
  selectedNumberOfRoomsToRent,
  selectedTotalNumberOfRooms,
  setSelectedNumberOfBathrooms,
  setSelectedNumberOfBedrooms,
  setSelectedNumberOfRoomsToRent,
  setSelectedTotalNumberOfRooms,
}) => {
  const {
    handleSelectBathrooms,
    handleSelectBedrooms,
    handleSelectRoomsToRent,
    handleSelectTotalRooms,
    totalRoomsColor,
    bathRoomsColor,
    bedRoomsColor,
    roomsToRentColor,
  } = useSharedRoomsFilterFuncs(
    propertyType,
    selectedTotalNumberOfRooms,
    selectedNumberOfRoomsToRent,
    selectedNumberOfBathrooms,
    selectedNumberOfBedrooms,
    setSelectedNumberOfBathrooms,
    setSelectedNumberOfBedrooms,
    setSelectedNumberOfRoomsToRent,
    setSelectedTotalNumberOfRooms
  );

  return (
    <View style={styles.container}>
      <Row style={sharedRoomsFilterStyles.row}>
        {filterType === "Bedrooms" ? (
          <Ionicons name="bed" size={25} color={primary} />
        ) : filterType === "Bathrooms" ? (
          <FontAwesome name="bath" size={25} color={primary} />
        ) : (
          <MaterialIcons name="meeting-room" size={25} color={primary} />
        )}
        <ThemedText type="header">{filterType}</ThemedText>
      </Row>
      <View style={sharedRoomsFilterStyles.roomContainer}>
        {filterType === "Rooms to rent" &&
          roomsToRentFilterList.map((numberOfRooms) => (
            <TouchableOpacity
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
                {numberOfRooms}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
      <Divider />
    </View>
  );
};

export default SharedRooms;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 10,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
});
