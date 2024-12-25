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
};

export type IBedroomsFilter = {
  isActive: boolean;
  propertyType:
    | PropertyTypesEnum.ResidentialForSale
    | PropertyTypesEnum.ResidentialRentals
    | "";
  figure: string;
};

export type ITotalRoomsFilter = {
  isActive: boolean;
  propertyType:
    | PropertyTypesEnum.ResidentialForSale
    | PropertyTypesEnum.ResidentialRentals
    | PropertyTypesEnum.CommercialForSale
    | PropertyTypesEnum.CommercialRentals
    | "";
  figure: string;
};

export type ICurrencyFilter = {
  isActive: boolean;
  propertyType: IPropertyType | "";
  currency: ICurrency | "";
};

export type IBathroomsFilter = {
  isActive: boolean;
  propertyType:
    | PropertyTypesEnum.ResidentialForSale
    | PropertyTypesEnum.ResidentialRentals
    | "";
  figure: string;
};

export type IRoomsToRentFilter = {
  isActive: boolean;
  propertyType:
    | PropertyTypesEnum.CommercialRentals
    | PropertyTypesEnum.ResidentialRentals
    | "";
  figure: string;
};

export type IPropertyStructureTypeFilter = {
  isActive: boolean;
  propertyType: IPropertyType | "";
  type: string;
};

export type IPropertySizeFilter = {
  isActive: boolean;
  propertyType: IPropertyType | "";
  figure: string;
  dimension: IDimensions;
};

const PropertyFiltersContext = createContext<{
  priceFilter: IPriceFilter;
  totalRoomsFilter: ITotalRoomsFilter;
  currencyFilter: ICurrencyFilter;
  rentFilter: IRentFilter;
  propertySizeFilter: IPropertySizeFilter;
  bedroomsFilter: IBedroomsFilter;
  bathroomsFilter: IBathroomsFilter;
  propertyStructureTypeFilter: IPropertyStructureTypeFilter;
  roomsToRentFilter: IRoomsToRentFilter;
  setTotalRoomsFilter: Dispatch<SetStateAction<ITotalRoomsFilter>>;
  setCurrencyFilter: Dispatch<SetStateAction<ICurrencyFilter>>;
  setPropertySizeFilter: Dispatch<SetStateAction<IPropertySizeFilter>>;
  setBedroomsFilter: Dispatch<SetStateAction<IBedroomsFilter>>;
  setBathroomsFilter: Dispatch<SetStateAction<IBathroomsFilter>>;
  setPropertyStructureTypeFilter: Dispatch<SetStateAction<IPropertyStructureTypeFilter>>;
  setRoomsToRentFilter: Dispatch<SetStateAction<IRoomsToRentFilter>>;
  setRentFilter: Dispatch<SetStateAction<IRentFilter>>;
  setPriceFilter: Dispatch<SetStateAction<IPriceFilter>>;
}>({
  currencyFilter: {
    isActive: false,
    propertyType: "",
    currency: "",
  },
  totalRoomsFilter: {
    isActive: false,
    figure: "",
    propertyType: "",
  },
  priceFilter: {
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
    figure: "",
  },
  propertyStructureTypeFilter: {
    isActive: false,
    propertyType: "",
    type: "",
  },
  bathroomsFilter: {
    isActive: false,
    propertyType: "",
    figure: "",
  },
  bedroomsFilter: {
    isActive: false,
    propertyType: "",
    figure: "",
  },
  roomsToRentFilter: {
    isActive: false,
    propertyType: "",
    figure: "",
  },
  setTotalRoomsFilter: () => {},
  setCurrencyFilter: () => {},
  setBathroomsFilter: () => {},
  setBedroomsFilter: () => {},
  setPropertySizeFilter: () => {},
  setPropertyStructureTypeFilter: () => {},
  setRoomsToRentFilter: () => {},
  setRentFilter: () => {},
  setPriceFilter: () => {},
});

export const PropertyFiltersContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currencyFilter, setCurrencyFilter] = useState<ICurrencyFilter>({
    isActive: false,
    propertyType: "",
    currency: "",
  });
  const [totalRoomsFilter, setTotalRoomsFilter] = useState<ITotalRoomsFilter>({
    isActive: false,
    propertyType: "",
    figure: "",
  });
  const [priceFilter, setPriceFilter] = useState<IPriceFilter>({
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
      figure: "",
    });

  const [propertyStructureTypeFilter, setPropertyStructureTypeFilter] =
    useState<IPropertyStructureTypeFilter>({
      isActive: false,
      propertyType: "",
      type: "",
    });
  const [roomsToRentFilter, setRoomsToRentFilter] =
    useState<IRoomsToRentFilter>({
      isActive: false,
      propertyType: "",
      figure: "",
    });

  const [bedroomsFilter, setBedroomsFilter] = useState<IBedroomsFilter>({
    isActive: false,
    propertyType: "",
    figure: "",
  });

  const [bathroomsFilter, setBathroomsFilter] = useState<IBathroomsFilter>({
    isActive: false,
    propertyType: "",
    figure: "",
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
        totalRoomsFilter,
        priceFilter,
        currencyFilter,
        rentFilter,
        propertySizeFilter,
        propertyStructureTypeFilter,
        bathroomsFilter,
        bedroomsFilter,
        roomsToRentFilter,
        setCurrencyFilter,
        setTotalRoomsFilter,
        setRentFilter,
        setPriceFilter,
        setBathroomsFilter,
        setBedroomsFilter,
        setPropertySizeFilter,
        setPropertyStructureTypeFilter,
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
