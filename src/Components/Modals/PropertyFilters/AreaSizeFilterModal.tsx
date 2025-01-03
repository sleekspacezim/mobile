import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import {
  dark,
  gray,
  lighterPrimary,
  primary,
  pureWhite,
} from "@/src/Theme/Colors";
import { family, small } from "@/src/Theme/Font";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import {
  IPropertySizeFilter,
  usePropertyFiltersContext,
} from "@/src/Context/PropertyFiltersContext";
import {
  activeOpacityOfTouchableOpacity,
  PropertyTypesEnum,
  SCREEN_BREAK_POINT,
} from "@/src/Utils/Constants";
import CustomButton from "../../Buttons/Custom/CustomButton";
import InputField from "../../InputField/InputField";
import Row from "../../Row/Row";
import ThemedText from "../../ThemedText/ThemedText";
import { propertySizeDimensions } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Contants";
import { sharedAreaSizeFilterStyles } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Styles";
import ResetFilterButton from "../../Buttons/ResetFilter/ResetFilterButton";
import usePropertyAreaSizeFilterFuncs from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/FilterItem/Hooks/usePropertyAreaSizeFilterFuncs";

type Props = {
  isFilterModalOpen: boolean;
  propertyType: IPropertyType;
  closeModal: IVoidFunc;
};

const AreaSizeFilterModal: React.FC<Props> = ({
  isFilterModalOpen,
  propertyType,
  closeModal,
}) => {
  const theme = useAppSelector((state) => state.theme.value);
  const { width } = useWindowDimensions();
  const { propertySizeFilter, setPropertySizeFilter } =
    usePropertyFiltersContext();
  const [propertySize, setPropertySize] =
    useState<IPropertySizeFilter>(propertySizeFilter);
  const {
    applyPropertySizeFilter,
    resetPropertySizeFilter,
    handleSelectDimensions,
    handleSelectSize,
    size,
    color,
  } = usePropertyAreaSizeFilterFuncs(
    propertySize,
    propertyType,
    setPropertySize
  );

  const handleFilterReset = () => {
    resetPropertySizeFilter();
    closeModal();
  };

  const handleApplyFilter = () => {
    applyPropertySizeFilter();
    closeModal();
  };

  const isPropertySizeSelected = () => {
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      if (propertySize.commercialForsale.figure) return true;
      else return false;
    } else if (propertyType === PropertyTypesEnum.CommercialRentals) {
      if (propertySize.commercialRentals.figure) return true;
      else return false;
    } else if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      if (propertySize.residentialForsale.figure) return true;
      else return false;
    } else if (propertyType === PropertyTypesEnum.ResidentialRentals) {
      if (propertySize.residentialRentals.figure) return true;
      else return false;
    } else if (propertyType === PropertyTypesEnum.Stands) {
      if (propertySize.stand.figure) return true;
      else return false;
    } else {
      if (propertySize.land.figure) return true;
      else return false;
    }
  };

  return (
    <Modal
      visible={isFilterModalOpen}
      onRequestClose={closeModal}
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
        onTouchEnd={closeModal}
      >
        <View
          onStartShouldSetResponder={(event) => true}
          onTouchEnd={(e) => {
            e.stopPropagation();
          }}
          style={[
            styles.subContainer,
            {
              backgroundColor: theme === "light" ? pureWhite : dark.background,
              width: width > SCREEN_BREAK_POINT ? 400 : "90%",
            },
          ]}
        >
          <Row style={styles.headerContainer}>
            <Row style={sharedAreaSizeFilterStyles.row}>
              <MaterialCommunityIcons
                name="view-grid"
                size={25}
                color={primary}
              />
              <ThemedText type="subHeader">Area Size</ThemedText>
            </Row>
            <View style={{ height: 30 }}>
              {isPropertySizeSelected() && (
                <ResetFilterButton handleResetFunc={handleFilterReset} />
              )}
            </View>
          </Row>
          <View style={{ marginTop: -10 }}>
            <InputField
              label="Size"
              textValue={size()}
              placeHolder="0"
              handleOnChangeText={handleSelectSize}
              contentType="none"
              type="number"
              width={200}
              height={50}
              borderColor={gray}
            />
          </View>
          <View style={sharedAreaSizeFilterStyles.dimensionContainer}>
            {propertySizeDimensions.map((dimension) => (
              <TouchableOpacity
                activeOpacity={activeOpacityOfTouchableOpacity}
                key={dimension}
                onPress={() => handleSelectDimensions(dimension)}
                style={[
                  sharedAreaSizeFilterStyles.dimension,
                  {
                    backgroundColor: color(
                      dimension,
                      lighterPrimary,
                      "transparent"
                    ),
                    borderColor: color(dimension, primary, gray),
                  },
                ]}
              >
                <Text
                  style={[
                    sharedAreaSizeFilterStyles.dimensionText,
                    {
                      color: color(dimension, primary, gray),
                    },
                  ]}
                >
                  {dimension === "m²" ? "Square Meters" : dimension}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <CustomButton title="Apply" onPressFunc={handleApplyFilter} />
        </View>
      </View>
    </Modal>
  );
};

export default AreaSizeFilterModal;

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
  headerContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    gap: 15,
    alignItems: "center",
  },
  dimensionContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 3,
  },
  dimension: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 7,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  dimensionText: {
    fontFamily: family,
    fontSize: small,
    paddingTop: 2,
  },
});
