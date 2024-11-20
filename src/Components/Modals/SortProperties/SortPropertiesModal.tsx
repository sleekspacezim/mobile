import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { FontAwesome6, FontAwesome5 } from "@expo/vector-icons";

import { useAppSelector } from "@/src/Redux/Hooks/Config";
import {
  ISortCommercialForSalePropertiesOptions,
  ISortCommercialRentalPropertiesOptions,
  ISortLandOptions,
  ISortResidentialForSalePropertiesOptions,
  ISortResidentialRentalPropertiesOptions,
  ISortStandOptions,
  useSortPropertiesContext,
} from "@/src/Context/SortPropertiesContext";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { family, small } from "@/src/Theme/Font";
import { pureWhite, dark, primary } from "@/src/Theme/Colors";
import {
  SCREEN_BREAK_POINT,
  activeOpacityOfTouchableOpacity,
} from "@/src/Utils/Constants";
import RegularText from "../../RegularText/RegularText";
import ThemedText from "../../ThemedText/ThemedText";
import {
  commercialForSaleSortOptions,
  commercialRentalSortOptions,
  landSortOptions,
  residentialForSaleSortOptions,
  residentialRentalSortOptions,
  standSortOptions,
} from "./SortingOptions/SortingOptions";

type Props = {
  handleCancel: IVoidFunc;
  isModalVisible: boolean;
  propertyType: IPropertyType;
};

const SortPropertiesModal: React.FC<Props> = ({
  handleCancel,
  isModalVisible,
  propertyType,
}) => {
  const theme = useAppSelector((state) => state.theme.value);
  const { width } = useWindowDimensions();
  const bgColor = theme === "light" ? "#DDDBDE" : "#3B3B3B";
  const {
    sortCommercialForSalePropertiesBy,
    sortCommercialRentalPropertiesBy,
    sortLandPropertiesBy,
    sortResidentialForSalePropertiesBy,
    sortResidentialRentalPropertiesBy,
    sortStandPropertiesBy,
    setSortCommercialForSalePropertiesBy,
    setSortCommercialRentalPropertiesBy,
    setSortLandPropertiesBy,
    setSortResidentialForSalePropertiesBy,
    setSortResidentialRentalPropertiesBy,
    setSortStandPropertiesBy,
  } = useSortPropertiesContext();

  const sortByOptions = () => {
    if (propertyType === "Commercial ForSale")
      return commercialForSaleSortOptions;
    else if (propertyType === "Commercial Rentals")
      return commercialRentalSortOptions;
    else if (propertyType === "Residential ForSale")
      return residentialForSaleSortOptions;
    else if (propertyType === "Residential Rentals")
      return residentialRentalSortOptions;
    else if (propertyType === "Land") return landSortOptions;
    else return standSortOptions;
  };

  const activeSortOption = () => {
    if (propertyType === "Commercial ForSale")
      return sortCommercialForSalePropertiesBy;
    else if (propertyType === "Commercial Rentals")
      return sortCommercialRentalPropertiesBy;
    else if (propertyType === "Residential ForSale")
      return sortResidentialForSalePropertiesBy;
    else if (propertyType === "Residential Rentals")
      return sortResidentialRentalPropertiesBy;
    else if (propertyType === "Land") return sortLandPropertiesBy;
    else return sortStandPropertiesBy;
  };

  const changeSortOption = (value: string) => {
    handleCancel();
    setTimeout(() => {
      if (propertyType === "Commercial ForSale")
        return setSortCommercialForSalePropertiesBy(
          value as ISortCommercialForSalePropertiesOptions
        );
      else if (propertyType === "Commercial Rentals")
        return setSortCommercialRentalPropertiesBy(
          value as ISortCommercialRentalPropertiesOptions
        );
      else if (propertyType === "Residential ForSale")
        return setSortResidentialForSalePropertiesBy(
          value as ISortResidentialForSalePropertiesOptions
        );
      else if (propertyType === "Residential Rentals")
        return setSortResidentialRentalPropertiesBy(
          value as ISortResidentialRentalPropertiesOptions
        );
      else if (propertyType === "Land")
        return setSortLandPropertiesBy(value as ISortLandOptions);
      else return setSortStandPropertiesBy(value as ISortStandOptions);
    }, 500);
  };

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
            contentContainerStyle={{ gap: 10 }}
            showsVerticalScrollIndicator={false}
          >
            <ThemedText type="subHeader">Sort By</ThemedText>
            <View style={styles.optionsContainer}>
              {sortByOptions().map((option) => (
                <TouchableOpacity
                  activeOpacity={activeOpacityOfTouchableOpacity}
                  key={option.name}
                  style={styles.option}
                  onPress={() => changeSortOption(option.value)}
                >
                  {option.value === activeSortOption() ? (
                    <FontAwesome6 name="dot-circle" size={24} color={primary} />
                  ) : (
                    <FontAwesome5
                      name="circle"
                      size={24}
                      color={theme === "light" ? dark.background : pureWhite}
                    />
                  )}
                  <RegularText>{option.name}</RegularText>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                activeOpacity={activeOpacityOfTouchableOpacity}
                onPress={handleCancel}
                style={[styles.btn, { backgroundColor: bgColor }]}
              >
                <ThemedText type="regular">Cancel</ThemedText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default SortPropertiesModal;

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
    gap: 10,
    marginVertical: 10,
  },
  optionsContainer: {
    flexDirection: "column",
    gap: 5,
  },
  option: {
    height: 40,
    gap: 15,
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
  }
});
