import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { PropertyTypesEnum } from "../Utils/Constants";
import {
  ICurrency,
  IDimensions,
  IPropertyType,
} from "../GlobalTypes/Property/Common";

export type IRentFilter = {
  isActive: boolean;
  propertyType:
    | PropertyTypesEnum.CommercialRentals
    | PropertyTypesEnum.ResidentialRentals
    | "";
  min: number;
  max: number;
};

export type IPriceFilter = {
  isActive: boolean;
  propertyType:
    | PropertyTypesEnum.CommercialForSale
    | PropertyTypesEnum.ResidentialForSale
    | PropertyTypesEnum.Land
    | PropertyTypesEnum.Stands
    | "";
  min: number;
  max: number;
  currency: ICurrency;
};

export type IBedroomsFilter = {
  isActive: boolean;
  propertyType:
    | PropertyTypesEnum.ResidentialForSale
    | PropertyTypesEnum.ResidentialRentals
    | "";
  figure: number;
};


export type IBathroomsFilter = {
  isActive: boolean;
  propertyType:
    | PropertyTypesEnum.ResidentialForSale
    | PropertyTypesEnum.ResidentialRentals
    | "";
  figure: number;
};

export type IRoomsToRentFilter = {
  isActive: boolean;
  propertyType:
    | PropertyTypesEnum.ResidentialForSale
    | PropertyTypesEnum.ResidentialRentals
    | "";
  figure: number;
};

export type IPropertyTypeFilter = {
  isActive: boolean;
  propertyType: IPropertyType | "";
  type: string;
};

export type IPropertySizeFilter = {
  isActive: boolean;
  propertyType: IPropertyType | "";
  figure: number;
  dimension: IDimensions;
};

const PropertyFiltersContext = createContext<{
  priceFilter: IPriceFilter;
  rentFilter: IRentFilter;
  propertySizeFilter: IPropertySizeFilter;
  bedroomsFilter: IBedroomsFilter;
  bathroomsFilter: IBathroomsFilter;
  propertyTypeFilter: IPropertyTypeFilter;
  roomsToRentFilter: IRoomsToRentFilter;
  setPropertySizeFilter: Dispatch<SetStateAction<IPropertySizeFilter>>;
  setBedroomsFilter: Dispatch<SetStateAction<IBedroomsFilter>>;
  setBathroomsFilter: Dispatch<SetStateAction<IBathroomsFilter>>;
  setPropertyTypeFilter: Dispatch<SetStateAction<IPropertyTypeFilter>>;
  setRoomsToRentFilter: Dispatch<SetStateAction<IRoomsToRentFilter>>;
  setRentFilter: Dispatch<SetStateAction<IRentFilter>>;
  setPriceFilter: Dispatch<SetStateAction<IPriceFilter>>;
}>({
  priceFilter: {
    currency: "US$",
    max: 0,
    min: 0,
    isActive: false,
    propertyType: "",
  },
  rentFilter: {
    isActive: false,
    propertyType: "",
    max: 0,
    min: 0,
  },
  propertySizeFilter: {
    isActive: false,
    propertyType: "",
    dimension: "m²",
    figure: 0,
  },
  propertyTypeFilter: {
    isActive: false,
    propertyType: "",
    type: "",
  },
  bathroomsFilter: {
    isActive: false,
    propertyType: "",
    figure: 0,
  },
  bedroomsFilter: {
    isActive: false,
    propertyType: "",
    figure: 0,
  },
  roomsToRentFilter: {
    isActive: false,
    propertyType: "",
    figure: 0,
  },
  setBathroomsFilter: () => {},
  setBedroomsFilter: () => {},
  setPropertySizeFilter: () => {},
  setPropertyTypeFilter: () => {},
  setRoomsToRentFilter: () => {},
  setRentFilter: () => {},
  setPriceFilter: () => {},
});

export const PropertyFiltersContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [priceFilter, setPriceFilter] = useState<IPriceFilter>({
    currency: "US$",
    max: 0,
    min: 0,
    isActive: false,
    propertyType: "",
  });

  const [propertySizeFilter, setPropertySizeFilter] =
    useState<IPropertySizeFilter>({
      isActive: false,
      propertyType: "",
      dimension: "m²",
      figure: 0,
    });

  const [propertyTypeFilter, setPropertyTypeFilter] =
    useState<IPropertyTypeFilter>({
      isActive: false,
      propertyType: "",
      type: "",
    });
  const [roomsToRentFilter, setRoomsToRentFilter] =
    useState<IRoomsToRentFilter>({
      isActive: false,
      propertyType: "",
      figure: 0,
    });

  const [bedroomsFilter, setBedroomsFilter] = useState<IBedroomsFilter>({
    isActive: false,
    propertyType: "",
    figure: 0,
  });

  const [bathroomsFilter, setBathroomsFilter] = useState<IBathroomsFilter>({
    isActive: false,
    propertyType: "",
    figure: 0,
  });

  const [rentFilter, setRentFilter] = useState<IRentFilter>({
    isActive: false,
    propertyType: "",
    max: 0,
    min: 0,
  });

  return (
    <PropertyFiltersContext.Provider
      value={{
        priceFilter,
        rentFilter,
        propertySizeFilter,
        propertyTypeFilter,
        bathroomsFilter,
        bedroomsFilter,
        roomsToRentFilter,
        setRentFilter,
        setPriceFilter,
        setBathroomsFilter,
        setBedroomsFilter,
        setPropertySizeFilter,
        setPropertyTypeFilter,
        setRoomsToRentFilter,
      }}
    >
      {children}
    </PropertyFiltersContext.Provider>
  );
};

export function usePropertyFiltersContext() {
  return useContext(PropertyFiltersContext);
}
