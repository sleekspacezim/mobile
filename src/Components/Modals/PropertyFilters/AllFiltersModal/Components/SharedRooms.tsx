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

type Props = {
  filterType: string;
  selectedTotalNumberOfRooms: string;
  selectedNumberOfRoomsToRent: string;
  selectedNumberOfBathrooms: string;
  selectedNumberOfBedrooms: string;
  setSelectedNumberOfBathrooms: React.Dispatch<React.SetStateAction<string>>;
  setSelectedNumberOfBedrooms: React.Dispatch<React.SetStateAction<string>>;
  setSelectedNumberOfRoomsToRent: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTotalNumberOfRooms: React.Dispatch<React.SetStateAction<string>>;
};

const SharedRooms: React.FC<Props> = ({
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
