import { FlatList, View } from "react-native";
import React from "react";

import FilterItem from "./FilterItem/FilterItem";
import { IPropertyFilter } from "../../../Types/Types";
import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { PropertyTypesEnum } from "@/src/Utils/Constants";

const Filters: INoPropsReactComponent = () => {
  const activePropertyType = useAppSelector(
    (state) => state.activePropertyType.value
  );
  const residentialRentalList: IPropertyFilter[] = [
    "Filters",
    "Rent",
    "Currency",
    "Rooms to rent",
    "Total rooms",
    "Bedrooms",
    "Bathrooms",
    "Size",
    "Type",
    "All Filters",
    "Reset Filters",
  ];
  const residentialForsaleList: IPropertyFilter[] = [
    "Filters",
    "Price",
    "Currency",
    "Total rooms",
    "Bedrooms",
    "Bathrooms",
    "Size",
    "Type",
    "All Filters",
    "Reset Filters",
  ];
  const commercialRentalList: IPropertyFilter[] = [
    "Filters",
    "Rent",
    "Currency",
    "Rooms to rent",
    "Total rooms",
    "Size",
    "Type",
    "All Filters",
    "Reset Filters",
  ];
  const commercialForsaleList: IPropertyFilter[] = [
    "Filters",
    "Price",
    "Currency",
    "Total rooms",
    "Size",
    "Type",
    "All Filters",
    "Reset Filters",
  ];
  const standList: IPropertyFilter[] = [
    "Filters",
    "Price",
    "Currency",
    "Size",
    "Type",
    "All Filters",
    "Reset Filters",
  ];
  const landList: IPropertyFilter[] = [
    "Filters",
    "Price",
    "Currency",
    "Size",
    "Type",
    "All Filters",
    "Reset Filters",
  ];

  const filterList: () => string[] = () => {
    if (activePropertyType === PropertyTypesEnum.CommercialForSale)
      return commercialForsaleList;
    else if (activePropertyType === PropertyTypesEnum.CommercialRentals)
      return commercialRentalList;
    else if (activePropertyType === PropertyTypesEnum.Land) return landList;
    else if (activePropertyType === PropertyTypesEnum.ResidentialForSale)
      return residentialForsaleList;
    else if (activePropertyType === PropertyTypesEnum.ResidentialRentals)
      return residentialRentalList;
    else return standList;
  };

  return (
    <View>
      <FlatList
        data={filterList()}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => (
          <FilterItem
            filterItem={item as IPropertyFilter}
            activePropertyType={activePropertyType}
          />
        )}
      />
    </View>
  );
};

export default Filters;
