import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { IPropertyFilter } from "@/src/Screens/Home/Types/Types";
import {
  IBathroomsFilter,
  IBedroomsFilter,
  ICurrencyFilter,
  IPriceFilter,
  IPropertySizeFilter,
  IPropertyStructureTypeFilter,
  IRentFilter,
  IRoomsToRentFilter,
  ITotalRoomsFilter,
} from "@/src/Context/PropertyFiltersContext";

const useFilterItemFuncs = (
  filterItem: IPropertyFilter,
  activePropertyType: IPropertyType,
  rentFilter: IRentFilter,
  currencyFilter: ICurrencyFilter,
  priceFilter: IPriceFilter,
  bathroomsFilter: IBathroomsFilter,
  bedroomsFilter: IBedroomsFilter,
  roomsToRentFilter: IRoomsToRentFilter,
  totalRoomsFilter: ITotalRoomsFilter,
  propertySizeFilter: IPropertySizeFilter,
  propertyTypeFilter: IPropertyStructureTypeFilter
) => {
  const filterName = () => {
    if (filterItem === "Rent") {
      if (
        (rentFilter.max > 0 || rentFilter.min > 0) &&
        rentFilter.propertyType === activePropertyType
      ) {
        return `${currencyFilter.currency ? currencyFilter.currency : "US$"}${
          rentFilter.min
        } - ${currencyFilter.currency ? currencyFilter.currency : "US$"}${
          rentFilter.max
        }`;
      } else return filterItem;
    } else if (filterItem === "Price") {
      if (
        (priceFilter.max > 0 || priceFilter.min > 0) &&
        priceFilter.propertyType === activePropertyType
      ) {
        return `${currencyFilter.currency ? currencyFilter.currency : "US$"}${
          priceFilter.min
        } - ${currencyFilter.currency ? currencyFilter.currency : "US$"}${
          priceFilter.max
        }`;
      } else return filterItem;
    } else if (filterItem === "Rooms to rent") {
      if (
        roomsToRentFilter.figure &&
        roomsToRentFilter.propertyType === activePropertyType
      )
        return roomsToRentFilter.figure === "full house"
          ? "Rent full house"
          : `${roomsToRentFilter.figure}  ${
              roomsToRentFilter.figure === "1" ? "Room to rent" : filterItem
            }`;
      else return filterItem;
    } else if (filterItem === "Bathrooms") {
      if (
        bathroomsFilter.figure &&
        bathroomsFilter.propertyType === activePropertyType
      )
        return `${bathroomsFilter.figure} ${
          bathroomsFilter.figure === "1" ? "bathroom" : filterItem
        }`;
      else return filterItem;
    } else if (filterItem === "Bedrooms") {
      if (
        bedroomsFilter.figure &&
        bedroomsFilter.propertyType === activePropertyType
      )
        return `${bedroomsFilter.figure} ${
          bedroomsFilter.figure === "1" ? "bedroom" : filterItem
        }`;
      else return filterItem;
    } else if (filterItem === "Total rooms") {
      if (
        totalRoomsFilter.figure &&
        totalRoomsFilter.propertyType === activePropertyType
      )
        return `${totalRoomsFilter.figure} ${filterItem}`;
      else return filterItem;
    } else if (filterItem === "Currency") {
      if (
        currencyFilter.currency &&
        currencyFilter.propertyType === activePropertyType
      )
        return `${
          currencyFilter.currency === "R" ? "Rands" : currencyFilter.currency
        } - ${filterItem}`;
      else return filterItem;
    } else if (filterItem === "Size") {
      if (
        propertySizeFilter.figure &&
        propertySizeFilter.propertyType === activePropertyType
      ) {
        return `Area Size - ${propertySizeFilter.figure} ${propertySizeFilter.dimension}`;
      } else return "Area Size";
    } else if (filterItem === "Type") {
      if (
        propertyTypeFilter.type &&
        propertyTypeFilter.propertyType === activePropertyType
      ) {
        return `${
          propertyTypeFilter.type === "Other"
            ? "Other"
            : propertyTypeFilter.type
        }`;
      } else return "Type";
    } else return filterItem;
  };

  const isFilterActive = () => {
    if (
      filterItem === "Bathrooms" &&
      bathroomsFilter.isActive &&
      activePropertyType === bathroomsFilter.propertyType
    ) {
      return true;
    }
    if (
      filterItem === "Currency" &&
      currencyFilter.isActive &&
      activePropertyType === currencyFilter.propertyType
    ) {
      return true;
    }
    if (
      filterItem === "Bedrooms" &&
      bedroomsFilter.isActive &&
      activePropertyType === bedroomsFilter.propertyType
    ) {
      return true;
    }
    if (
      filterItem === "Price" &&
      priceFilter.isActive &&
      activePropertyType === priceFilter.propertyType
    ) {
      return true;
    }
    if (
      filterItem === "Size" &&
      propertySizeFilter.isActive &&
      activePropertyType === propertySizeFilter.propertyType
    ) {
      return true;
    }
    if (
      filterItem === "Type" &&
      propertyTypeFilter.isActive &&
      activePropertyType === propertyTypeFilter.propertyType
    ) {
      return true;
    }
    if (
      filterItem === "Rent" &&
      rentFilter.isActive &&
      activePropertyType === rentFilter.propertyType
    ) {
      return true;
    }
    if (
      filterItem === "Total rooms" &&
      totalRoomsFilter.isActive &&
      activePropertyType === totalRoomsFilter.propertyType
    ) {
      return true;
    }
    if (
      filterItem === "Rooms to rent" &&
      roomsToRentFilter.isActive &&
      activePropertyType === roomsToRentFilter.propertyType
    ) {
      return true;
    } else return false;
  };
  return { filterName, isFilterActive };
};

export default useFilterItemFuncs;
