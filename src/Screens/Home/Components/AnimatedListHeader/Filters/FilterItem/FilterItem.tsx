import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { dark, gray, primary } from "@/src/Theme/Colors";
import { family, medium, small } from "@/src/Theme/Font";
import { usePropertyFiltersContext } from "@/src/Context/PropertyFiltersContext";
import { IPropertyFilter } from "@/src/Screens/Home/Types/Types";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import Row from "@/src/Components/Row/Row";
import { activeOpacityOfTouchableOpacity } from "@/src/Utils/Constants";
import { useBottomSheetsContext } from "@/src/Context/BottomSheetsContext";

type Props = {
  filterItem: IPropertyFilter;
  propertType: IPropertyType;
};

const FilterItem: React.FC<Props> = ({ filterItem, propertType }) => {
  const {
    priceFilter,
    propertySizeFilter,
    propertyTypeFilter,
    rentFilter,
    roomsToRentFilter,
    bathroomsFilter,
    bedroomsFilter,
  } = usePropertyFiltersContext();
  const { setPropertyFiltersBottomSheet } = useBottomSheetsContext();

  const theme = useAppSelector((state) => state.theme.value);

  const isFilterActive = () => {
    if (
      filterItem === "Bathrooms" &&
      bathroomsFilter.isActive &&
      propertType === bathroomsFilter.propertyType
    ) {
      return true;
    }
    if (
      filterItem === "Bedrooms" &&
      bedroomsFilter.isActive &&
      propertType === bedroomsFilter.propertyType
    ) {
      return true;
    }
    if (
      filterItem === "Price" &&
      priceFilter.isActive &&
      propertType === priceFilter.propertyType
    ) {
      return true;
    }
    if (
      filterItem === "Size" &&
      propertySizeFilter.isActive &&
      propertType === propertySizeFilter.propertyType
    ) {
      return true;
    }
    if (
      filterItem === "Type" &&
      propertyTypeFilter.isActive &&
      propertType === propertyTypeFilter.propertyType
    ) {
      return true;
    }
    if (
      filterItem === "Rent" &&
      rentFilter.isActive &&
      propertType === rentFilter.propertyType
    ) {
      return true;
    }
    if (
      filterItem === "Rooms to rent" &&
      roomsToRentFilter.isActive &&
      propertType === roomsToRentFilter.propertyType
    ) {
      return true;
    } else return false;
  };

  const handleFilterPress = () => {
    if (filterItem === "Bathrooms") {
      setPropertyFiltersBottomSheet({
        type: "Bathrooms",
        isOpen: true,
      });
    }
    if (filterItem === "Bedrooms") {
      setPropertyFiltersBottomSheet({
        type: "Bedrooms",
        isOpen: true,
      });
    }
    if (filterItem === "Price") {
      setPropertyFiltersBottomSheet({
        type: "Price",
        isOpen: true,
      });
    }
    if (filterItem === "Size") {
      setPropertyFiltersBottomSheet({
        type: "Size",
        isOpen: true,
      });
    }
    if (filterItem === "Type") {
      setPropertyFiltersBottomSheet({
        type: "Type",
        isOpen: true,
      });
    }
    if (filterItem === "Rent") {
      setPropertyFiltersBottomSheet({
        type: "Rent",
        isOpen: true,
      });
    }
    if (filterItem === "Rooms to rent") {
      setPropertyFiltersBottomSheet({
        type: "Rooms to rent",
        isOpen: true,
      });
    }
    if (filterItem === "Reset Filters") {
      console.log("reset");
    } else {
      setPropertyFiltersBottomSheet({
        type: "All Filters",
        isOpen: true,
      });
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={activeOpacityOfTouchableOpacity}
      onPress={handleFilterPress}
      style={[
        styles.container,
        {
          borderColor:
            filterItem === "Reset Filters"
              ? "transparent"
              : isFilterActive()
              ? primary
              : theme === "dark"
              ? dark.darkGray
              : gray,
          marginRight: filterItem === "Reset Filters" ? 7 : 0,
        },
      ]}
    >
      {filterItem === "Filters" ? (
        <MaterialCommunityIcons
          name="filter-variant"
          size={24}
          color={primary}
        />
      ) : (
        <Row style={styles.row}>
          {filterItem === "All Filters" && (
            <MaterialCommunityIcons
              name="filter-variant"
              size={24}
              color={theme === "dark" ? "gray" : gray}
            />
          )}
          <Text
            style={[
              styles.text,
              {
                fontSize: filterItem === "Reset Filters" ? medium : small,
                fontWeight: filterItem === "Reset Filters" ? "bold" : "400",
                color:
                  filterItem === "Reset Filters"
                    ? primary
                    : isFilterActive()
                    ? primary
                    : theme === "dark"
                    ? "gray"
                    : gray,
              },
            ]}
          >
            {filterItem}
          </Text>
        </Row>
      )}
    </TouchableOpacity>
  );
};

export default FilterItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 7,
  },
  row: {
    gap: 5,
    alignItems: "center",
  },
  text: {
    fontFamily: family,
  },
});
