import {
  ISortCommercialForSalePropertiesOptions,
  ISortCommercialRentalPropertiesOptions,
  ISortLandOptions,
  ISortResidentialForSalePropertiesOptions,
  ISortResidentialRentalPropertiesOptions,
  ISortStandOptions,
} from "@/src/Context/SortPropertiesContext";

export const residentialForSaleSortOptions: {
  name: string;
  value: ISortResidentialForSalePropertiesOptions;
}[] = [
  {
    name: "Newest",
    value: "newest",
  },
  {
    name: "Oldest",
    value: "oldest",
  },
  {
    name: "Price (Low to High)",
    value: "price_low_to_high",
  },
  {
    name: "Price (High to Low)",
    value: "price_high_to_low",
  },
  {
    name: "Total rooms (Low to High)",
    value: "total_rooms_low_to_high",
  },
  {
    name: "Total rooms (High to Low)",
    value: "total_rooms_high_to_low",
  },
  {
    name: "Size (Low to High)",
    value: "size_low_to_high",
  },
  {
    name: "Size (High to Low)",
    value: "size_high_to_low",
  },
  {
    name: "Year built (oldest to new)",
    value: "year_built_oldest_to_new",
  },
  {
    name: "Year built (newest to old)",
    value: "year_built_newest_to_old",
  },
];

export const residentialRentalSortOptions: {
  name: string;
  value: ISortResidentialRentalPropertiesOptions;
}[] = [
  {
    name: "Newest",
    value: "newest",
  },
  {
    name: "Rent (Low to High)",
    value: "rent_low_to_high",
  },
  {
    name: "Rent (High to Low)",
    value: "rent_high_to_low",
  },
  {
    name: "Rooms to rent (High to Low)",
    value: "rooms_to_rent_high_to_low",
  },
  {
    name: "Rooms to rent (Low to High)",
    value: "rooms_to_rent_low_to_high",
  },
  {
    name: "Total rooms (Low to High)",
    value: "total_rooms_low_to_high",
  },
  {
    name: "Total rooms (High to Low)",
    value: "total_rooms_high_to_low",
  },
  {
    name: "Size (Low to High)",
    value: "size_low_to_high",
  },
  {
    name: "Size (High to Low)",
    value: "size_high_to_low",
  },
  {
    name: "Year built (oldest to new)",
    value: "year_built_oldest_to_new",
  },
  {
    name: "Year built (newest to old)",
    value: "year_built_newest_to_old",
  },
];

export const commercialRentalSortOptions: {
  name: string;
  value: ISortCommercialRentalPropertiesOptions;
}[] = [
  {
    name: "Newest",
    value: "newest",
  },
  {
    name: "Rent (Low to High)",
    value: "rent_low_to_high",
  },
  {
    name: "Rent (High to Low)",
    value: "rent_high_to_low",
  },
  {
    name: "Rooms to rent (High to Low)",
    value: "rooms_to_rent_high_to_low",
  },
  {
    name: "Rooms to rent (Low to High)",
    value: "rooms_to_rent_low_to_high",
  },
  {
    name: "Total rooms (Low to High)",
    value: "total_rooms_low_to_high",
  },
  {
    name: "Total rooms (High to Low)",
    value: "total_rooms_high_to_low",
  },
  {
    name: "Size (Low to High)",
    value: "size_low_to_high",
  },
  {
    name: "Size (High to Low)",
    value: "size_high_to_low",
  },
  {
    name: "Year built (oldest to new)",
    value: "year_built_oldest_to_new",
  },
  {
    name: "Year built (newest to old)",
    value: "year_built_newest_to_old",
  },
];

export const commercialForSaleSortOptions: {
  name: string;
  value: ISortCommercialForSalePropertiesOptions;
}[] = [
  {
    name: "Newest",
    value: "newest",
  },
  {
    name: "Price (Low to High)",
    value: "price_low_to_high",
  },
  {
    name: "Price (High to Low)",
    value: "price_high_to_low",
  },
  {
    name: "Total rooms (Low to High)",
    value: "total_rooms_low_to_high",
  },
  {
    name: "Total rooms (High to Low)",
    value: "total_rooms_high_to_low",
  },
  {
    name: "Size (Low to High)",
    value: "size_low_to_high",
  },
  {
    name: "Size (High to Low)",
    value: "size_high_to_low",
  },
  {
    name: "Year built (oldest to new)",
    value: "year_built_oldest_to_new",
  },
  {
    name: "Year built (newest to old)",
    value: "year_built_newest_to_old",
  },
];

export const landSortOptions: {
  name: string;
  value: ISortLandOptions;
}[] = [
  {
    name: "Newest",
    value: "newest",
  },
  {
    name: "Price (Low to High)",
    value: "price_low_to_high",
  },
  {
    name: "Price (High to Low)",
    value: "price_high_to_low",
  },
  {
    name: "Size (Low to High)",
    value: "size_low_to_high",
  },
  {
    name: "Size (High to Low)",
    value: "size_high_to_low",
  },
];

export const standSortOptions: {
  name: string;
  value: ISortStandOptions;
}[] = [
  {
    name: "Newest",
    value: "newest",
  },
  {
    name: "Price (Low to High)",
    value: "price_low_to_high",
  },
  {
    name: "Price (High to Low)",
    value: "price_high_to_low",
  },
  {
    name: "Size (Low to High)",
    value: "size_low_to_high",
  },
  {
    name: "Size (High to Low)",
    value: "size_high_to_low",
  },
];
