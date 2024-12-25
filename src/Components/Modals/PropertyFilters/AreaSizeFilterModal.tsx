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
import { IPropertySize, IVoidFunc } from "@/src/GlobalTypes/Types";
import {
  dark,
  gray,
  lighterPrimary,
  primary,
  pureWhite,
} from "@/src/Theme/Colors";
import { family, small } from "@/src/Theme/Font";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { usePropertyFiltersContext } from "@/src/Context/PropertyFiltersContext";
import { SCREEN_BREAK_POINT } from "@/src/Utils/Constants";
import CustomButton from "../../Buttons/Custom/CustomButton";
import InputField from "../../InputField/InputField";
import Row from "../../Row/Row";
import ThemedText from "../../ThemedText/ThemedText";
import { propertySizeDimensions } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Contants";
import {
  sharedAreaSizeFilterStyles,
} from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Styles";
import ResetFilterButton from "../../Buttons/ResetFilter/ResetFilterButton";

type Props = {
  isFilterModalOpen: boolean;
  propertyType: IPropertyType | "";
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
  const [propertySize, setPropertySize] = useState<IPropertySize>({
    figure: propertySizeFilter.figure,
    dimension: propertySizeFilter.dimension,
  });

  const handleFilterReset = () => {
    setPropertySize({
      figure: "",
      dimension: "m²",
    });
    setPropertySizeFilter({
      isActive: false,
      figure: "",
      dimension: "m²",
      propertyType: "",
    });
    closeModal();
  };

  const handleApplyFilter = () => {
    if (propertySize.figure) {
      setPropertySizeFilter({
        isActive: true,
        figure: propertySize.figure,
        dimension: propertySize.dimension,
        propertyType,
      });
    } else {
      setPropertySizeFilter({
        isActive: false,
        figure: "",
        dimension: "m²",
        propertyType: "",
      });
    }
    closeModal();
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
              {propertySizeFilter.figure && (
                <ResetFilterButton handleResetFunc={handleFilterReset}/>
              )}
            </View>
          </Row>
          <View style={{ marginTop: -10 }}>
            <InputField
              label="Size"
              textValue={propertySize.figure}
              placeHolder="0"
              handleOnChangeText={(figure: string) =>
                setPropertySize({ ...propertySize, figure })
              }
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
                key={dimension}
                onPress={() => setPropertySize({ ...propertySize, dimension })}
                style={[
                  sharedAreaSizeFilterStyles.dimension,
                  {
                    backgroundColor:
                      propertySize.dimension === dimension
                        ? lighterPrimary
                        : "transparent",
                    borderColor:
                      propertySize.dimension === dimension ? primary : gray,
                  },
                ]}
              >
                <Text
                  style={[
                    sharedAreaSizeFilterStyles.dimensionText,
                    {
                      color:
                        propertySize.dimension === dimension ? primary : gray,
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
