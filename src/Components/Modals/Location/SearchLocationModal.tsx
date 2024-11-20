import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";

import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import {
  pureWhite,
  dark,
  white,
  light,
  primary,
  gray,
} from "@/src/Theme/Colors";
import { family, small } from "@/src/Theme/Font";
import MyCurrentLocation from "../../CurrentLocation/MyCurrentLocation";
import Row from "../../Row/Row";
import ThemedText from "../../ThemedText/ThemedText";
import RegularText from "../../RegularText/RegularText";
import { activeOpacityOfTouchableOpacity } from "@/src/Utils/Constants";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";

type Props = {
  handleCancel: IVoidFunc;
  isModalVisible: boolean;
  propertyType?: IPropertyType;
};

const SearchLocationModal: React.FC<Props> = ({
  isModalVisible,
  propertyType,
  handleCancel,
}) => {
  const { width } = useWindowDimensions();
  const theme = useAppSelector((state) => state.theme.value);

  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={handleCancel}
      transparent
      animationType="fade"
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme === "light" ? "#000000b3" : "#333333b3",
          },
        ]}
      >
        <View
          style={[
            styles.subContainer,
            {
              width: width > 500 ? 280 : 250,
              backgroundColor: theme === "light" ? pureWhite : dark.background,
            },
          ]}
        >
          <View style={styles.iconContainer}>
            <FontAwesome6 name="map-location-dot" size={30} color={white} />
          </View>
          <ThemedText type="header">Location Options</ThemedText>
          <View style={styles.adviceText}>
            <RegularText>
              We encourage you to use the map for better accuracy.
            </RegularText>
          </View>
          <Row style={styles.row}>
            <MyCurrentLocation isInModal closeModal={handleCancel} />
            <TouchableOpacity
            activeOpacity={activeOpacityOfTouchableOpacity}
              onPress={() => {
                handleCancel();
                router.push({
                  pathname: "/map",
                  params: {
                    from: "post property",
                    propertyType,
                  },
                });
              }}
              style={[
                styles.mediaOption,
                {
                  backgroundColor:
                    theme === "light" ? light.darkGray : dark.darkGray,
                },
              ]}
            >
              <Ionicons name="map" size={27} color={primary} />
              <Text style={styles.mediaOptionText}>map</Text>
            </TouchableOpacity>
          </Row>
        </View>
      </View>
    </Modal>
  );
};

export default SearchLocationModal;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    paddingHorizontal: 10,
    borderTopWidth: 3,
    borderTopColor: primary,
    paddingBottom: 15,
    paddingTop: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: 210,
    gap: 10,
  },
  adviceText: { width: "100%", alignItems: "center", justifyContent: "center" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  mediaOption: {
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    width: 65,
    borderRadius: 7,
    paddingTop: 6,
  },
  mediaOptionText: {
    fontFamily: family,
    fontSize: small,
    color: gray,
  },
  iconContainer: {
    position: "absolute",
    top: -25,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primary,
  },
});
