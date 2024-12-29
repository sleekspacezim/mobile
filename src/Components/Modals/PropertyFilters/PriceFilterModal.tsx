import { Modal, StyleSheet, useWindowDimensions, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { SCREEN_BREAK_POINT } from "@/src/Utils/Constants";
import {
  IPriceFilter,
  usePropertyFiltersContext,
} from "@/src/Context/PropertyFiltersContext";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { dark, primary, pureWhite } from "@/src/Theme/Colors";
import CustomButton from "../../Buttons/Custom/CustomButton";
import InputField from "../../InputField/InputField";
import RangingSlider from "../../RangingSlider/RangingSlider";
import RegularText from "../../RegularText/RegularText";
import Row from "../../Row/Row";
import ThemedText from "../../ThemedText/ThemedText";
import ResetFilterButton from "../../Buttons/ResetFilter/ResetFilterButton";
import { sharedPriceFilterStyles } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Styles";
import usePriceFilterFuncs from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/FilterItem/Hooks/usePriceFilterFuncs";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";

type Props = {
  isFilterModalOpen: boolean;
  propertyType: IPropertyType;
  closeModal: IVoidFunc;
};

const PriceFilterModal: React.FC<Props> = ({
  isFilterModalOpen,
  propertyType,
  closeModal,
}) => {
  const { priceFilter } = usePropertyFiltersContext();
  const [price, setPrice] = useState<IPriceFilter>(priceFilter);
  const theme = useAppSelector((state) => state.theme.value);
  const { width } = useWindowDimensions();
  const maxValue = 1000000;
  const {
    priceMax,
    priceMin,
    setPriceMax,
    setPriceMin,
    applyPriceFilter,
    resetPriceFilter,
    borderColor,
  } = usePriceFilterFuncs(price, propertyType, setPrice);

  const applyFilter = () => {
    if (priceMin() <= priceMax()) {
      applyPriceFilter();
      closeModal();
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
            <Row style={sharedPriceFilterStyles.row}>
              <Ionicons name="pricetag-outline" size={25} color={primary} />
              <ThemedText type="subHeader">Price Filter</ThemedText>
            </Row>
            {(priceMax() > 0 || priceMin() > 0) && (
              <ResetFilterButton handleResetFunc={resetPriceFilter} />
            )}
          </Row>
          <View style={sharedPriceFilterStyles.sliderContainer}>
            <RegularText>(Min) Price</RegularText>
            <RangingSlider
              maxValue={maxValue}
              minValue={0}
              onChange={setPriceMin}
              value={priceMin()}
              step={10}
            />
          </View>
          <Row style={sharedPriceFilterStyles.inputRow}>
            <View>
              <InputField
                textValue={priceMin().toString()}
                placeHolder="0"
                handleOnChangeText={(rent: string) => setPriceMin(+rent)}
                contentType="none"
                type="number"
                width={130}
                height={50}
                borderColor={borderColor()}
              />
            </View>
            <ThemedText type="regular">To</ThemedText>
            <View>
              <InputField
                textValue={priceMax().toString()}
                placeHolder="Any"
                handleOnChangeText={(rent: string) => setPriceMax(+rent)}
                contentType="none"
                type="number"
                width={130}
                height={50}
                borderColor={borderColor()}
              />
            </View>
          </Row>
          <View style={sharedPriceFilterStyles.sliderContainer}>
            <RegularText>(Max) Price</RegularText>
            <RangingSlider
              maxValue={maxValue}
              minValue={0}
              onChange={setPriceMax}
              value={priceMax()}
              step={10}
            />
          </View>
          <CustomButton
            title="Apply"
            onPressFunc={applyFilter}
            isDisabled={priceMax() < priceMin() ? true : false}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PriceFilterModal;

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
});
