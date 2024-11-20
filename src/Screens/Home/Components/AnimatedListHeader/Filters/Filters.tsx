import { FlatList, StyleSheet, View } from "react-native";
import React from "react";

import FilterItem from "./FilterItem/FilterItem";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { IPropertyFilter } from "../../../Types/Types";

type Props = {
  propertyType: IPropertyType;
};

const Filters: React.FC<Props> = ({ propertyType }) => {
  const residentialRentalList:IPropertyFilter[] = [
    "Filters",
    "Rent",
    "Rooms to rent",
    "Bedrooms",
    "Size",
    "Bathrooms",
    "Type",
    "All Filters",
    "Reset Filters",
  ];
  const residentialForsaleList:IPropertyFilter[] = [
    "Filters",
    "Price",
    "Size",
    "Bedrooms",
    "Bathrooms",
    "Type",
    "All Filters",
    "Reset Filters",
  ];
  const commercialRentalList:IPropertyFilter[] = [
    "Filters",
    "Rent",
    "Size",
    "Type",
    "Rooms to rent",
    "All Filters",
    "Reset Filters",
  ];
  const commercialForsaleList:IPropertyFilter[] = [
    "Filters",
    "Price",
    "Size",
    "Type",
    "All Filters",
    "Reset Filters",
  ];
  const standList:IPropertyFilter[] = [
    "Filters",
    "Price",
    "Size",
    "Type",
    "All Filters",
    "Reset Filters",
  ];
  const landList:IPropertyFilter[] = [
    "Filters",
    "Price",
    "Size",
    "Type",
    "All Filters",
    "Reset Filters",
  ];

  const filterList: () => string[] = () => {
    if (propertyType === "Commercial ForSale") return commercialForsaleList;
    else if (propertyType === "Commercial Rentals") return commercialRentalList;
    else if (propertyType === "Land") return landList;
    else if (propertyType === "Residential ForSale")
      return residentialForsaleList;
    else if (propertyType === "Residential Rentals")
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
          <FilterItem filterItem={item as IPropertyFilter} propertType={propertyType} />
        )}
      />
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({});
