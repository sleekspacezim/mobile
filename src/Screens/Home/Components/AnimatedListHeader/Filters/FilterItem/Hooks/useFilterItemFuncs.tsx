import millify from "millify";

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
import { PropertyTypesEnum } from "@/src/Utils/Constants";

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
        activePropertyType === PropertyTypesEnum.CommercialRentals &&
        (rentFilter.commercialRentals.max > 0 ||
          rentFilter.commercialRentals.min > 0)
      ) {
        return `${
          currencyFilter.commercialRentals
            ? currencyFilter.commercialRentals
            : "US$"
        }${millify(rentFilter.commercialRentals.min)} - ${
          currencyFilter.commercialRentals
            ? currencyFilter.commercialRentals
            : "US$"
        }${millify(rentFilter.commercialRentals.max)}`;
      } else if (
        activePropertyType === PropertyTypesEnum.ResidentialRentals &&
        (rentFilter.residentialRentals.max > 0 ||
          rentFilter.residentialRentals.min > 0)
      ) {
        return `${
          currencyFilter.residentialRentals
            ? currencyFilter.residentialRentals
            : "US$"
        }${millify(rentFilter.residentialRentals.min)} - ${
          currencyFilter.residentialRentals
            ? currencyFilter.residentialRentals
            : "US$"
        }${millify(rentFilter.residentialRentals.max)}`;
      } else return filterItem;
    } else if (filterItem === "Price") {
      if (
        (priceFilter.residentialForSale.max > 0 ||
          priceFilter.residentialForSale.min > 0) &&
        activePropertyType === PropertyTypesEnum.ResidentialForSale
      ) {
        return `${
          currencyFilter.residentialForsale
            ? currencyFilter.residentialForsale
            : "US$"
        }${millify(priceFilter.residentialForSale.min)} - ${
          currencyFilter.residentialForsale
            ? currencyFilter.residentialForsale
            : "US$"
        }${millify(priceFilter.residentialForSale.max)}`;
      } else if (
        (priceFilter.commercialForSale.max > 0 ||
          priceFilter.commercialForSale.min > 0) &&
        activePropertyType === PropertyTypesEnum.CommercialForSale
      ) {
        return `${
          currencyFilter.commercialForsale
            ? currencyFilter.commercialForsale
            : "US$"
        }${millify(priceFilter.commercialForSale.min)} - ${
          currencyFilter.commercialForsale
            ? currencyFilter.commercialForsale
            : "US$"
        }${millify(priceFilter.commercialForSale.max)}`;
      } else if (
        (priceFilter.stand.max > 0 || priceFilter.stand.min > 0) &&
        activePropertyType === PropertyTypesEnum.Stands
      ) {
        return `${currencyFilter.stand ? currencyFilter.stand : "US$"}${millify(
          priceFilter.stand.min
        )} - ${currencyFilter.stand ? currencyFilter.stand : "US$"}${millify(
          priceFilter.stand.max
        )}`;
      } else if (
        (priceFilter.land.max > 0 || priceFilter.land.min > 0) &&
        activePropertyType === PropertyTypesEnum.Land
      ) {
        return `${currencyFilter.land ? currencyFilter.land : "US$"}${millify(
          priceFilter.land.min
        )} - ${currencyFilter.land ? currencyFilter.land : "US$"}${millify(
          priceFilter.land.max
        )}`;
      } else return filterItem;
    } else if (filterItem === "Rooms to rent") {
      if (
        roomsToRentFilter.commercialRentalsFigure &&
        activePropertyType === PropertyTypesEnum.CommercialRentals
      )
        return roomsToRentFilter.commercialRentalsFigure === "full house"
          ? "Rent full house"
          : `${roomsToRentFilter.commercialRentalsFigure}  ${
              roomsToRentFilter.commercialRentalsFigure === "1"
                ? "Room to rent"
                : filterItem
            }`;
      else if (
        roomsToRentFilter.residentialRentalsFigure &&
        activePropertyType === PropertyTypesEnum.ResidentialRentals
      )
        return roomsToRentFilter.residentialRentalsFigure === "full house"
          ? "Rent full house"
          : `${roomsToRentFilter.residentialRentalsFigure}  ${
              roomsToRentFilter.residentialRentalsFigure === "1"
                ? "Room to rent"
                : filterItem
            }`;
      else return filterItem;
    } else if (filterItem === "Bathrooms") {
      if (
        bathroomsFilter.residentialForsaleFigure &&
        activePropertyType === PropertyTypesEnum.ResidentialForSale
      )
        return `${bathroomsFilter.residentialForsaleFigure} ${
          bathroomsFilter.residentialForsaleFigure === "1"
            ? "bathroom"
            : filterItem
        }`;
      else if (
        bathroomsFilter.residentialRentalsFigure &&
        activePropertyType === PropertyTypesEnum.ResidentialRentals
      )
        return `${bathroomsFilter.residentialRentalsFigure} ${
          bathroomsFilter.residentialRentalsFigure === "1"
            ? "bathroom"
            : filterItem
        }`;
      else return filterItem;
    } else if (filterItem === "Bedrooms") {
      if (
        activePropertyType === PropertyTypesEnum.ResidentialForSale &&
        bedroomsFilter.residentialForsaleFigure
      )
        return `${bedroomsFilter.residentialForsaleFigure} ${
          bedroomsFilter.residentialForsaleFigure === "1"
            ? "Bedroom"
            : filterItem
        }`;
      else if (
        activePropertyType === PropertyTypesEnum.ResidentialRentals &&
        bedroomsFilter.residentialRentalsFigure
      ) {
        return `${bedroomsFilter.residentialRentalsFigure} ${
          bedroomsFilter.residentialRentalsFigure === "1"
            ? "Bedroom"
            : filterItem
        }`;
      } else return filterItem;
    } else if (filterItem === "Total rooms") {
      if (
        totalRoomsFilter.commercialForsaleFigure &&
        activePropertyType === PropertyTypesEnum.CommercialForSale
      )
        return `${totalRoomsFilter.commercialForsaleFigure} ${filterItem}`;
      else if (
        totalRoomsFilter.commercialRentalsFigure &&
        activePropertyType === PropertyTypesEnum.CommercialRentals
      )
        return `${totalRoomsFilter.commercialRentalsFigure} ${filterItem}`;
      else if (
        totalRoomsFilter.residentialForsaleFigure &&
        activePropertyType === PropertyTypesEnum.ResidentialForSale
      )
        return `${totalRoomsFilter.residentialForsaleFigure} ${filterItem}`;
      else if (
        totalRoomsFilter.residentialRentalsFigure &&
        activePropertyType === PropertyTypesEnum.ResidentialRentals
      )
        return `${totalRoomsFilter.residentialRentalsFigure} ${filterItem}`;
      else return filterItem;
    } else if (filterItem === "Currency") {
      if (
        currencyFilter.commercialForsale &&
        activePropertyType === PropertyTypesEnum.CommercialForSale
      )
        return `${
          currencyFilter.commercialForsale === "R"
            ? "Rands"
            : currencyFilter.commercialForsale
        } - ${filterItem}`;
      if (
        currencyFilter.commercialRentals &&
        activePropertyType === PropertyTypesEnum.CommercialRentals
      ) {
        return `${
          currencyFilter.commercialRentals === "R"
            ? "Rands"
            : currencyFilter.commercialRentals
        } - ${filterItem}`;
      }
      if (
        currencyFilter.residentialForsale &&
        activePropertyType === PropertyTypesEnum.ResidentialForSale
      )
        return `${
          currencyFilter.residentialForsale === "R"
            ? "Rands"
            : currencyFilter.residentialForsale
        } - ${filterItem}`;
      if (
        currencyFilter.residentialRentals &&
        activePropertyType === PropertyTypesEnum.ResidentialRentals
      )
        return `${
          currencyFilter.residentialRentals === "R"
            ? "Rands"
            : currencyFilter.residentialRentals
        } - ${filterItem}`;
      if (
        currencyFilter.stand &&
        activePropertyType === PropertyTypesEnum.Stands
      )
        return `${
          currencyFilter.stand === "R" ? "Rands" : currencyFilter.stand
        } - ${filterItem}`;
      if (currencyFilter.land && activePropertyType === PropertyTypesEnum.Land)
        return `${
          currencyFilter.land === "R" ? "Rands" : currencyFilter.land
        } - ${filterItem}`;
      else return filterItem;
    } else if (filterItem === "Size") {
      if (
        propertySizeFilter.residentialForsale.figure &&
        activePropertyType === PropertyTypesEnum.ResidentialForSale
      ) {
        return `Area Size - ${propertySizeFilter.residentialForsale.figure} ${propertySizeFilter.residentialForsale.dimension}`;
      } else if (
        propertySizeFilter.residentialRentals.figure &&
        activePropertyType === PropertyTypesEnum.ResidentialRentals
      ) {
        return `Area Size - ${propertySizeFilter.residentialRentals.figure} ${propertySizeFilter.residentialRentals.dimension}`;
      } else if (
        propertySizeFilter.commercialForsale.figure &&
        activePropertyType === PropertyTypesEnum.CommercialForSale
      ) {
        return `Area Size - ${propertySizeFilter.commercialForsale.figure} ${propertySizeFilter.commercialForsale.dimension}`;
      } else if (
        propertySizeFilter.commercialRentals.figure &&
        activePropertyType === PropertyTypesEnum.CommercialRentals
      ) {
        return `Area Size - ${propertySizeFilter.commercialRentals.figure} ${propertySizeFilter.commercialRentals.dimension}`;
      } else if (
        propertySizeFilter.stand.figure &&
        activePropertyType === PropertyTypesEnum.Stands
      ) {
        return `Area Size - ${propertySizeFilter.stand.figure} ${propertySizeFilter.stand.dimension}`;
      } else if (
        propertySizeFilter.land.figure &&
        activePropertyType === PropertyTypesEnum.Land
      ) {
        return `Area Size - ${propertySizeFilter.land.figure} ${propertySizeFilter.land.dimension}`;
      } else return "Area Size";
    } else if (filterItem === "Type") {
      if (
        propertyTypeFilter.commercialForsale &&
        activePropertyType === PropertyTypesEnum.CommercialForSale
      ) {
        return `${
          propertyTypeFilter.commercialForsale === "Other"
            ? "Other"
            : propertyTypeFilter.commercialForsale
        }`;
      } else if (
        propertyTypeFilter.commercialRentals &&
        activePropertyType === PropertyTypesEnum.CommercialRentals
      ) {
        return `${
          propertyTypeFilter.commercialRentals === "Other"
            ? "Other"
            : propertyTypeFilter.commercialRentals
        }`;
      } else if (
        propertyTypeFilter.residentialForsale &&
        activePropertyType === PropertyTypesEnum.ResidentialForSale
      ) {
        return `${
          propertyTypeFilter.residentialForsale === "Other"
            ? "Other"
            : propertyTypeFilter.residentialForsale
        }`;
      } else if (
        propertyTypeFilter.residentialRentals &&
        activePropertyType === PropertyTypesEnum.ResidentialRentals
      ) {
        return `${
          propertyTypeFilter.residentialRentals === "Other"
            ? "Other"
            : propertyTypeFilter.residentialRentals
        }`;
      } else if (
        propertyTypeFilter.stand &&
        activePropertyType === PropertyTypesEnum.Stands
      ) {
        return `${
          propertyTypeFilter.stand === "Other"
            ? "Other"
            : propertyTypeFilter.stand
        }`;
      } else if (
        propertyTypeFilter.land &&
        activePropertyType === PropertyTypesEnum.Land
      ) {
        return `${
          propertyTypeFilter.land === "Other"
            ? "Other"
            : propertyTypeFilter.land
        }`;
      } else return "Type";
    } else return filterItem;
  };

  const isFilterActive = () => {
    if (filterItem === "Bathrooms") {
      if (
        bathroomsFilter.residentialForsaleFigure &&
        activePropertyType === PropertyTypesEnum.ResidentialForSale
      ) {
        return true;
      } else if (
        bathroomsFilter.residentialRentalsFigure &&
        activePropertyType === PropertyTypesEnum.ResidentialRentals
      ) {
        return true;
      } else return false;
    }
    if (filterItem === "Currency") {
      if (
        currencyFilter.commercialForsale &&
        activePropertyType === PropertyTypesEnum.CommercialForSale
      ) {
        return true;
      } else if (
        currencyFilter.commercialRentals &&
        activePropertyType === PropertyTypesEnum.CommercialRentals
      ) {
        return true;
      } else if (
        currencyFilter.residentialForsale &&
        activePropertyType === PropertyTypesEnum.ResidentialForSale
      ) {
        return true;
      } else if (
        currencyFilter.residentialRentals &&
        activePropertyType === PropertyTypesEnum.ResidentialRentals
      ) {
        return true;
      } else if (
        currencyFilter.stand &&
        activePropertyType === PropertyTypesEnum.Stands
      ) {
        return true;
      } else if (
        currencyFilter.land &&
        activePropertyType === PropertyTypesEnum.Land
      ) {
        return true;
      } else return false;
    }
    if (filterItem === "Bedrooms") {
      if (
        activePropertyType === PropertyTypesEnum.ResidentialForSale &&
        bedroomsFilter.residentialForsaleFigure
      )
        return true;
      else if (
        activePropertyType === PropertyTypesEnum.ResidentialRentals &&
        bedroomsFilter.residentialRentalsFigure
      )
        return true;
      else return false;
    }
    if (filterItem === "Price") {
      if (
        (priceFilter.commercialForSale.max > 0 ||
          priceFilter.commercialForSale.min > 0) &&
        activePropertyType === PropertyTypesEnum.CommercialForSale
      ) {
        return true;
      } else if (
        (priceFilter.residentialForSale.max > 0 ||
          priceFilter.residentialForSale.min > 0) &&
        activePropertyType === PropertyTypesEnum.ResidentialForSale
      ) {
        return true;
      } else if (
        (priceFilter.stand.max > 0 || priceFilter.stand.min > 0) &&
        activePropertyType === PropertyTypesEnum.Stands
      ) {
        return true;
      } else if (
        (priceFilter.land.max > 0 || priceFilter.land.min > 0) &&
        activePropertyType === PropertyTypesEnum.Land
      ) {
        return true;
      } else return false;
    }
    if (filterItem === "Size") {
      if (
        propertySizeFilter.commercialForsale.figure &&
        activePropertyType === PropertyTypesEnum.CommercialForSale
      ) {
        return true;
      } else if (
        propertySizeFilter.commercialRentals.figure &&
        activePropertyType === PropertyTypesEnum.CommercialRentals
      ) {
        return true;
      } else if (
        propertySizeFilter.residentialForsale.figure &&
        activePropertyType === PropertyTypesEnum.ResidentialForSale
      ) {
        return true;
      } else if (
        propertySizeFilter.residentialRentals.figure &&
        activePropertyType === PropertyTypesEnum.ResidentialRentals
      ) {
        return true;
      } else if (
        propertySizeFilter.stand.figure &&
        activePropertyType === PropertyTypesEnum.Stands
      ) {
        return true;
      } else if (
        propertySizeFilter.land.figure &&
        activePropertyType === PropertyTypesEnum.Land
      ) {
        return true;
      } else return false;
    }
    if (filterItem === "Type") {
      if (
        propertyTypeFilter.commercialForsale &&
        activePropertyType === PropertyTypesEnum.CommercialForSale
      ) {
        return true;
      } else if (
        propertyTypeFilter.commercialRentals &&
        activePropertyType === PropertyTypesEnum.CommercialRentals
      ) {
        return true;
      } else if (
        propertyTypeFilter.residentialForsale &&
        activePropertyType === PropertyTypesEnum.ResidentialForSale
      ) {
        return true;
      } else if (
        propertyTypeFilter.residentialRentals &&
        activePropertyType === PropertyTypesEnum.ResidentialRentals
      ) {
        return true;
      } else if (
        propertyTypeFilter.stand &&
        activePropertyType === PropertyTypesEnum.Stands
      ) {
        return true;
      } else if (
        propertyTypeFilter.land &&
        activePropertyType === PropertyTypesEnum.Land
      ) {
        return true;
      } else return false;
    }
    if (filterItem === "Rent") {
      if (
        (rentFilter.commercialRentals.max > 0 ||
          rentFilter.commercialRentals.min > 0) &&
        activePropertyType === PropertyTypesEnum.CommercialRentals
      ) {
        return true;
      } else if (
        (rentFilter.residentialRentals.max > 0 ||
          rentFilter.residentialRentals.min > 0) &&
        activePropertyType === PropertyTypesEnum.ResidentialRentals
      ) {
        return true;
      } else return false;
    }
    if (filterItem === "Total rooms") {
      if (
        totalRoomsFilter.commercialForsaleFigure &&
        activePropertyType === PropertyTypesEnum.CommercialForSale
      ) {
        return true;
      } else if (
        totalRoomsFilter.commercialRentalsFigure &&
        activePropertyType === PropertyTypesEnum.CommercialRentals
      ) {
        return true;
      } else if (
        totalRoomsFilter.residentialForsaleFigure &&
        activePropertyType === PropertyTypesEnum.ResidentialForSale
      ) {
        return true;
      } else if (
        totalRoomsFilter.residentialRentalsFigure &&
        activePropertyType === PropertyTypesEnum.ResidentialRentals
      ) {
        return true;
      } else return false;
    }
    if (filterItem === "Rooms to rent") {
      if (
        roomsToRentFilter.commercialRentalsFigure &&
        activePropertyType === PropertyTypesEnum.CommercialRentals
      ) {
        return true;
      } else if (
        roomsToRentFilter.residentialRentalsFigure &&
        activePropertyType === PropertyTypesEnum.ResidentialRentals
      ) {
        return true;
      } else return false;
    } else return false;
  };
  return { filterName, isFilterActive };
};

export default useFilterItemFuncs;
