import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { primary, lighterPrimary, gray } from "@/src/Theme/Colors";
import {
  IPropertyStructureTypeFilter,
  usePropertyFiltersContext,
} from "@/src/Context/PropertyFiltersContext";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import ResetFilterButton from "@/src/Components/Buttons/ResetFilter/ResetFilterButton";
import { sharedPropertyStructureTypeStyles } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Styles";
import {
  propertyStructureTypeIcon,
  propertyStructureTypeOptions,
} from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Funcs";
import usePropertyStructureFilterFuncs from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/FilterItem/Hooks/usePropertyStructureFilterFuncs";
import {
  activeOpacityOfTouchableOpacity,
  PropertyTypesEnum,
} from "@/src/Utils/Constants";

type Props = {
  closeBottomSheet: IVoidFunc;
};

const PropertyStructureTypeFilter: React.FC<Props> = ({ closeBottomSheet }) => {
  const { propertyStructureTypeFilter } = usePropertyFiltersContext();
  const activePropertyType = useAppSelector(
    (state) => state.activePropertyType.value
  );
  const [propertyStructureType, setPropertyStructureType] =
    useState<IPropertyStructureTypeFilter>(propertyStructureTypeFilter);

  const {
    handleSelectStructure,
    color,
    resetPropertyStructureTypeFilter,
    applyPropertyStructureTypeFilter,
  } = usePropertyStructureFilterFuncs(
    propertyStructureType,
    activePropertyType,
    setPropertyStructureType
  );

  const handleFilterReset = () => {
    resetPropertyStructureTypeFilter();
    closeBottomSheet();
  };

  const handleApplyFilter = () => {
    applyPropertyStructureTypeFilter();
    closeBottomSheet();
  };

  const isPropertyStructureTypeSelected = () => {
    if (activePropertyType === PropertyTypesEnum.CommercialForSale) {
      if (propertyStructureTypeFilter.commercialForsale) return true;
      else return false;
    } else if (activePropertyType === PropertyTypesEnum.CommercialRentals) {
      if (propertyStructureTypeFilter.commercialRentals) return true;
      else return false;
    } else if (activePropertyType === PropertyTypesEnum.ResidentialForSale) {
      if (propertyStructureTypeFilter.residentialForsale) return true;
      else return false;
    } else if (activePropertyType === PropertyTypesEnum.ResidentialRentals) {
      if (propertyStructureTypeFilter.residentialRentals) return true;
      else return false;
    } else if (activePropertyType === PropertyTypesEnum.Stands) {
      if (propertyStructureTypeFilter.stand) return true;
      else return false;
    } else {
      if (propertyStructureTypeFilter.land) return true;
      else return false;
    }
  };

  return (
    <View style={styles.container}>
      <Row style={styles.headerContainer}>
        <Row style={sharedPropertyStructureTypeStyles.row}>
          <FontAwesome name="building" size={25} color={primary} />
          <ThemedText type="subHeader">Property Structure Type</ThemedText>
        </Row>
        <View style={{ height: 30 }}>
          {isPropertyStructureTypeSelected() && (
            <ResetFilterButton handleResetFunc={handleFilterReset} />
          )}
        </View>
      </Row>
      <View style={sharedPropertyStructureTypeStyles.propertyTypeContainer}>
        {propertyStructureTypeOptions(activePropertyType).map(
          (propertyStructureTypeOption) => (
            <TouchableOpacity
              activeOpacity={activeOpacityOfTouchableOpacity}
              key={propertyStructureTypeOption}
              onPress={() => handleSelectStructure(propertyStructureTypeOption)}
              style={[
                sharedPropertyStructureTypeStyles.propertyTypeOption,
                {
                  backgroundColor: color(
                    propertyStructureTypeOption,
                    lighterPrimary,
                    "transparent"
                  ),
                  borderColor: color(
                    propertyStructureTypeOption,
                    primary,
                    gray
                  ),
                },
              ]}
            >
              {propertyStructureTypeIcon(propertyStructureTypeOption)}
              <Text
                style={[
                  sharedPropertyStructureTypeStyles.propertyTypeOptionText,
                  {
                    color: color(propertyStructureTypeOption, primary, gray),
                  },
                ]}
              >
                {propertyStructureTypeOption}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>
      <View style={{ justifyContent: "flex-end" }}>
        <CustomButton title="Apply" onPressFunc={handleApplyFilter} />
      </View>
    </View>
  );
};

export default PropertyStructureTypeFilter;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    height: 330,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
});
