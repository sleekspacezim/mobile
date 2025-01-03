import { ICurrency, IDimensions } from "@/src/GlobalTypes/Property/Common";

export const propertySizeDimensions: IDimensions[] = ["m²", "Acres"];
export const filterCurrencyTypes: ICurrency[] = ["US$", "R", "ZIG"];
export const residentialStructuralTypes = [
  "Single family home",
  "Multi family complex",
  "Cottage",
  "Apartment",
  "Duplex",
  "Triplex",
  "Flat",
];
export const commercialStructuralTypes = [
  "Shop",
  "Building",
  "Land",
  "Factory",
  "Flat",
  "Other",
];
export const landStructuralTypes = [
  "Residential",
  "Mine",
  "Farm",
  "Plot",
  "Other",
];
export const standStructuralTypes = [
  "Residential",
  "Commercial building",
  "Shop",
  "Flat",
  "Other",
];

export const roomsToRentResidentialPropertyFilterList: string[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8plus",
  "full house",
];

export const roomsToRentCommercialPropertyFilterList: string[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8plus",
  "full space",
];


export const totalRoomsFilterList: string[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8plus",
];
export const bathRoomsFilterList: string[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8plus",
];
export const bedRoomsFilterList: string[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8plus",
];
