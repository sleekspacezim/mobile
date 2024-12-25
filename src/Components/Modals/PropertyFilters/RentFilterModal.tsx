import {
  Modal,
  StyleSheet,
  useWindowDimensions,
  View
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { pureWhite, dark, primary, gray, red } from "@/src/Theme/Colors";
import { PropertyTypesEnum, SCREEN_BREAK_POINT } from "@/src/Utils/Constants";
import ThemedText from "../../ThemedText/ThemedText";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import CustomButton from "../../Buttons/Custom/CustomButton";
import InputField from "../../InputField/InputField";
import Row from "../../Row/Row";
import RangingSlider from "../../RangingSlider/RangingSlider";
import RegularText from "../../RegularText/RegularText";
import { usePropertyFiltersContext } from "@/src/Context/PropertyFiltersContext";
import ResetFilterButton from "../../Buttons/ResetFilter/ResetFilterButton";
import { sharedRentFilterStyles } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Styles";

type Props = {
  isFilterModalOpen: boolean;
  propertyType:
    | PropertyTypesEnum.CommercialRentals
    | PropertyTypesEnum.ResidentialRentals
    | "";
  closeModal: IVoidFunc;
};

const RentFilterModal: React.FC<Props> = ({
  isFilterModalOpen,
  propertyType,
  closeModal,
}) => {
  const { setRentFilter, rentFilter } = usePropertyFiltersContext();
  const [rentMin, setRentMin] = useState<number>(rentFilter.min);
  const [rentMax, setRentMax] = useState<number>(rentFilter.max);
  const theme = useAppSelector((state) => state.theme.value);
  const { width } = useWindowDimensions();
  const maxValue = 3000;

  const borderColor = () => {
    if (rentMin !== 0 && rentMin >= rentMax) {
      return red;
    } else return gray;
  };

  const handleFilterReset = () => {
    setRentMax(0);
    setRentMin(0);
    setRentFilter({
      isActive: false,
      max: 0,
      min: 0,
      propertyType: "",
    });
  };

  const applyFilter = () => {
    if (rentMin <= rentMax) {
      if (rentMax > 0 || rentMin > 0) {
        setRentFilter({
          isActive: true,
          max: rentMax,
          min: rentMin,
          propertyType,
        });
        closeModal();
      }
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
            <Row style={sharedRentFilterStyles.row}>
              <Ionicons name="pricetag-outline" size={25} color={primary} />
              <ThemedText type="subHeader">Rent Filter</ThemedText>
            </Row>
            {(rentMax > 0 || rentMin > 0) && (
              <ResetFilterButton handleResetFunc={handleFilterReset}/>
            )}
          </Row>
          <View style={sharedRentFilterStyles.sliderContainer}>
            <RegularText>(Min) Rental Amount</RegularText>
            <RangingSlider
              maxValue={maxValue}
              minValue={0}
              onChange={setRentMin}
              value={rentMin}
              step={10}
            />
          </View>
          <Row style={sharedRentFilterStyles.inputRow}>
            <View>
              <InputField
                textValue={rentMin.toString()}
                placeHolder="0"
                handleOnChangeText={(rent: string) => setRentMin(+rent)}
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
                textValue={rentMax.toString()}
                placeHolder="Any"
                handleOnChangeText={(rent: string) => setRentMax(+rent)}
                contentType="none"
                type="number"
                width={130}
                height={50}
                borderColor={borderColor()}
              />
            </View>
          </Row>
          <View style={sharedRentFilterStyles.sliderContainer}>
            <RegularText>(Max) Rental Amount</RegularText>
            <RangingSlider
              maxValue={maxValue}
              minValue={0}
              onChange={setRentMax}
              value={rentMax}
              step={10}
            />
          </View>
          <CustomButton
            title="Apply"
            onPressFunc={applyFilter}
            isDisabled={rentMax < rentMin ? true : false}
          />
        </View>
      </View>
    </Modal>
  );
};

export default RentFilterModal;

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
  }
});
