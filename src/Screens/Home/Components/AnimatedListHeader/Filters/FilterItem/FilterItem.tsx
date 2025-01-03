import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { dark, gray, lighterPrimary, primary } from "@/src/Theme/Colors";
import { family, medium, small } from "@/src/Theme/Font";
import { usePropertyFiltersContext } from "@/src/Context/PropertyFiltersContext";
import { IPropertyFilter } from "@/src/Screens/Home/Types/Types";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import Row from "@/src/Components/Row/Row";
import {
  activeOpacityOfTouchableOpacity,
  PropertyTypesEnum,
} from "@/src/Utils/Constants";
import { useBottomSheetsContext } from "@/src/Context/BottomSheetsContext";
import RentFilterModal from "@/src/Components/Modals/PropertyFilters/RentFilterModal";
import AreaSizeFilterModal from "@/src/Components/Modals/PropertyFilters/AreaSizeFilterModal";
import AllFiltersModal from "@/src/Components/Modals/PropertyFilters/AllFiltersModal/AllFiltersModal";
import PriceFilterModal from "@/src/Components/Modals/PropertyFilters/PriceFilterModal";
import useFilterItemFuncs from "./Hooks/useFilterItemFuncs";
import useResetFiltersFunc from "./Hooks/useResetFiltersFunc";

type Props = {
  filterItem: IPropertyFilter;
  activePropertyType: IPropertyType;
};

const FilterItem: React.FC<Props> = ({ filterItem, activePropertyType }) => {
  const [openRentFilterModal, setOpenRentFilterModal] =
    useState<boolean>(false);
  const [openAreaSizeFilterModal, setOpenAreaSizeFilterModal] =
    useState<boolean>(false);
  const [openAllFiltersModal, setOpenAllFiltersModal] =
    useState<boolean>(false);
  const [openPriceFilterModal, setOpenPriceFilterModal] =
    useState<boolean>(false);
  const {
    priceFilter,
    propertySizeFilter,
    propertyStructureTypeFilter,
    rentFilter,
    totalRoomsFilter,
    roomsToRentFilter,
    bathroomsFilter,
    bedroomsFilter,
    currencyFilter,
  } = usePropertyFiltersContext();
  const {handleResetFilters} = useResetFiltersFunc()
  const { setPropertyFiltersBottomSheet } = useBottomSheetsContext();
  const { filterName, isFilterActive } = useFilterItemFuncs
(
    filterItem,
    activePropertyType,
    rentFilter,
    currencyFilter,
    priceFilter,
    bathroomsFilter,
    bedroomsFilter,
    roomsToRentFilter,
    totalRoomsFilter,
    propertySizeFilter,
    propertyStructureTypeFilter
  );

  const theme = useAppSelector((state) => state.theme.value);

  const handleFilterPress = () => {
    if (filterItem === "Bathrooms") {
      setPropertyFiltersBottomSheet("Bathrooms");
    } else if (filterItem === "Currency") {
      setPropertyFiltersBottomSheet("Currency");
    } else if (filterItem === "Bedrooms") {
      setPropertyFiltersBottomSheet("Bedrooms");
    } else if (filterItem === "Price") {
      setOpenPriceFilterModal(true);
    } else if (filterItem === "Size") {
      setOpenAreaSizeFilterModal(true);
    } else if (filterItem === "Type") {
      setPropertyFiltersBottomSheet("Type");
    } else if (filterItem === "Rent") {
      setOpenRentFilterModal(true);
    } else if (filterItem === "Rooms to rent") {
      setPropertyFiltersBottomSheet("Rooms to rent");
    } else if (filterItem === "Total rooms") {
      setPropertyFiltersBottomSheet("Total rooms");
    } else if (filterItem === "Reset Filters") {
      handleResetFilters()
    } else {
      setOpenAllFiltersModal(true);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={activeOpacityOfTouchableOpacity}
      onPress={handleFilterPress}
      style={[
        styles.container,
        {
          backgroundColor: isFilterActive() ? lighterPrimary : "transparent",
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
            {filterName()}
          </Text>
        </Row>
      )}
      {openRentFilterModal && (
        <RentFilterModal
          isFilterModalOpen={openRentFilterModal}
          propertyType={
            (activePropertyType as PropertyTypesEnum.CommercialRentals) ||
            "" ||
            PropertyTypesEnum.ResidentialRentals
          }
          closeModal={() => setOpenRentFilterModal(false)}
        />
      )}
      {openPriceFilterModal && (
        <PriceFilterModal
          isFilterModalOpen={openPriceFilterModal}
          propertyType={
            (activePropertyType as PropertyTypesEnum.CommercialForSale) ||
            "" ||
            PropertyTypesEnum.ResidentialForSale ||
            PropertyTypesEnum.Stands ||
            PropertyTypesEnum.Land
          }
          closeModal={() => setOpenPriceFilterModal(false)}
        />
      )}
      {openAreaSizeFilterModal && (
        <AreaSizeFilterModal
          closeModal={() => setOpenAreaSizeFilterModal(false)}
          isFilterModalOpen={openAreaSizeFilterModal}
          propertyType={activePropertyType}
        />
      )}
      {openAllFiltersModal && (
        <AllFiltersModal
          closeModal={() => setOpenAllFiltersModal(false)}
          isFilterModalOpen={openAllFiltersModal}
        />
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
    paddingTop: 2,
  },
});
