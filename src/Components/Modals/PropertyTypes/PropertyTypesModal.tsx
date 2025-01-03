import {
  GestureResponderEvent,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { FontAwesome6, FontAwesome5 } from "@expo/vector-icons";

import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { pureWhite, dark, primary, white, gray } from "@/src/Theme/Colors";
import { family, small } from "@/src/Theme/Font";
import {
  SCREEN_BREAK_POINT,
  activeOpacityOfTouchableOpacity,
} from "@/src/Utils/Constants";
import RegularText from "../../RegularText/RegularText";
import ThemedText from "../../ThemedText/ThemedText";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";

type Props = {
  isModalVisible: boolean;
  selectedPropertyType: IPropertyType
  propertyTypes: IPropertyType[]
  setSelectedPropertyType: React.Dispatch<React.SetStateAction<IPropertyType>>,
  handleCancel: IVoidFunc;
  handleOkay: IVoidFunc;
};

const PropertyTypesModal: React.FC<Props> = ({
  propertyTypes,
  selectedPropertyType,
  isModalVisible,
  setSelectedPropertyType,
  handleCancel,
  handleOkay,
}) => {
  const theme = useAppSelector((state) => state.theme.value);
  const { width } = useWindowDimensions();
  const bgColor = theme === "light" ? "#DDDBDE" : "#3B3B3B";
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
            backgroundColor: theme === "light" ? "#000000b3" : "#1b1b1cb3",
          },
        ]}
      >
        <View
          style={[
            styles.subContainer,
            {
              backgroundColor: theme === "light" ? pureWhite : dark.background,
              width: width > SCREEN_BREAK_POINT ? 400 : "90%",
            },
          ]}
        >
          <ScrollView
            contentContainerStyle={{ gap: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <ThemedText type="subHeader">Property Type</ThemedText>
            <View style={styles.propertyTypeContainer}>
              {propertyTypes.map((propertyType) => (
                <TouchableOpacity
                  activeOpacity={activeOpacityOfTouchableOpacity}
                  key={propertyType}
                  style={styles.propertyType}
                  onPress={(e: GestureResponderEvent) => {
                    e.stopPropagation();
                    setSelectedPropertyType(propertyType);
                  }}
                >
                  {propertyType === selectedPropertyType ? (
                    <FontAwesome6 name="dot-circle" size={24} color={primary} />
                  ) : (
                    <FontAwesome5
                      name="circle"
                      size={24}
                      color={theme === "light" ? dark.background : pureWhite}
                    />
                  )}
                  <RegularText>{propertyType}</RegularText>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                activeOpacity={activeOpacityOfTouchableOpacity}
                onPress={(e: GestureResponderEvent) => {
                  e.stopPropagation();
                  handleCancel();
                }}
                style={[styles.btn, { backgroundColor: bgColor }]}
              >
                <ThemedText type="regular">Cancel</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={activeOpacityOfTouchableOpacity}
                style={[
                  styles.btn,
                  { backgroundColor: selectedPropertyType ? primary : bgColor },
                ]}
                onPress={handleOkay}
              >
                <Text
                  style={[
                    styles.okayText,
                    {
                      color: selectedPropertyType ? white : gray,
                    },
                  ]}
                >
                  Okay
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default PropertyTypesModal;

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
    padding: 10,
    borderRadius: 10,
    position: "relative",
    gap: 20,
    marginVertical: 10,
  },
  propertyTypeContainer: {
    flexDirection: "column",
    gap: 5,
  },
  propertyType: {
    height: 50,
    gap: 20,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 20,
  },
  btn: {
    height: 40,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  okayText: {
    fontFamily: family,
    fontSize: small,
  },
});
