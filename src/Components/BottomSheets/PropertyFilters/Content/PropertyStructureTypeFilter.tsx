import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { primary, lighterPrimary, gray } from "@/src/Theme/Colors";
import { usePropertyFiltersContext } from "@/src/Context/PropertyFiltersContext";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import ResetFilterButton from "@/src/Components/Buttons/ResetFilter/ResetFilterButton";
import { sharedPropertyStructureTypeStyles } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Styles";
import {
  propertyStructureTypeIcon,
  propertyStructureTypeOptions,
} from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Funcs";

type Props = {
  closeBottomSheet: IVoidFunc;
};

const PropertyStructureTypeFilter: React.FC<Props> = ({ closeBottomSheet }) => {
  const { propertyStructureTypeFilter, setPropertyStructureTypeFilter } =
    usePropertyFiltersContext();
  const activePropertyType = useAppSelector(
    (state) => state.activePropertyType.value
  );
  const [propertyStructureType, setPropertyStructureType] = useState<string>(
    propertyStructureTypeFilter.type
  );

  const handleFilterReset = () => {
    setPropertyStructureType("");
    setPropertyStructureTypeFilter({
      isActive: false,
      type: "",
      propertyType: "",
    });
    closeBottomSheet();
  };

  const handleApplyFilter = () => {
    setPropertyStructureTypeFilter({
      isActive: true,
      type: propertyStructureType,
      propertyType: activePropertyType,
    });
    closeBottomSheet();
  };

  return (
    <View style={styles.container}>
      <Row style={styles.headerContainer}>
        <Row style={sharedPropertyStructureTypeStyles.row}>
          <FontAwesome name="building" size={25} color={primary} />
          <ThemedText type="subHeader">Property Structure Type</ThemedText>
        </Row>
        <View style={{ height: 30 }}>
          {propertyStructureTypeFilter.type && (
            <ResetFilterButton handleResetFunc={handleFilterReset} />
          )}
        </View>
      </Row>
      <View style={sharedPropertyStructureTypeStyles.propertyTypeContainer}>
        {propertyStructureTypeOptions(activePropertyType).map(
          (propertyStructureTypeOption) => (
            <TouchableOpacity
              key={propertyStructureTypeOption}
              onPress={() =>
                setPropertyStructureType(propertyStructureTypeOption)
              }
              style={[
                sharedPropertyStructureTypeStyles.propertyTypeOption,
                {
                  backgroundColor:
                    propertyStructureType === propertyStructureTypeOption
                      ? lighterPrimary
                      : "transparent",
                  borderColor:
                    propertyStructureType === propertyStructureTypeOption
                      ? primary
                      : gray,
                },
              ]}
            >
              {propertyStructureTypeIcon(propertyStructureTypeOption)}
              <Text
                style={[
                  sharedPropertyStructureTypeStyles.propertyTypeOptionText,
                  {
                    color:
                      propertyStructureType === propertyStructureTypeOption
                        ? primary
                        : gray,
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
