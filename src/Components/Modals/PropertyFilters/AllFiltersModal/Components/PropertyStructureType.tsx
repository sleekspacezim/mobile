import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { primary, lighterPrimary, gray } from "@/src/Theme/Colors";
import {
  propertyStructureTypeIcon,
  propertyStructureTypeOptions,
} from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Funcs";
import { sharedPropertyStructureTypeStyles } from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/Shared/Styles";
import { IPropertyStructureTypeFilter } from "@/src/Context/PropertyFiltersContext";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import usePropertyStructureFilterFuncs from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/FilterItem/Hooks/usePropertyStructureFilterFuncs";

type Props = {
  propertyType: IPropertyType;
  propertyStructureType: IPropertyStructureTypeFilter;
  setPropertyStructureType: React.Dispatch<
    React.SetStateAction<IPropertyStructureTypeFilter>
  >;
};

const PropertyStructureType: React.FC<Props> = ({
  propertyType,
  propertyStructureType,
  setPropertyStructureType,
}) => {
  const { handleSelectStructure, color } = usePropertyStructureFilterFuncs(
    propertyStructureType,
    propertyType,
    setPropertyStructureType
  );

  return (
    <View style={styles.container}>
      <Row style={sharedPropertyStructureTypeStyles.row}>
        <FontAwesome name="building" size={25} color={primary} />
        <ThemedText type="header">Property Structure Type</ThemedText>
      </Row>
      <View style={sharedPropertyStructureTypeStyles.propertyTypeContainer}>
        {propertyStructureTypeOptions(propertyType).map(
          (propertyStructureTypeOption) => (
            <TouchableOpacity
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
    </View>
  );
};

export default PropertyStructureType;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 10,
  },
});
