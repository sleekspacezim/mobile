import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { ICommercialPropertyForSaleWithManager } from "../GlobalTypes/Property/Commercial/ForSaleTypes";
import { ICommercialRentalPropertyWithManager } from "../GlobalTypes/Property/Commercial/RentalTypes";
import { ILandPropertyWithManager } from "../GlobalTypes/Property/Land/LandTypes";
import { IResidentialPropertyForSaleWithManager } from "../GlobalTypes/Property/Residential/ForSaleTypes";
import { IResidentialRentalPropertyWithManager } from "../GlobalTypes/Property/Residential/RentalTypes";
import { IStandPropertyWithManager } from "../GlobalTypes/Property/Stand/StandTypes";

const SearchByLocationPropertyResultsContext = createContext<{
  rentalCommercialPropertiesSearchResults: ICommercialRentalPropertyWithManager[];
  onSaleCommercialPropertiesSearchResults: ICommercialPropertyForSaleWithManager[];
  rentalResidentialPropertiesSearchResults: IResidentialRentalPropertyWithManager[];
  onSaleResidentialPropertiesSearchResults: IResidentialPropertyForSaleWithManager[];
  standPropertiesSearchResults: IStandPropertyWithManager[];
  landPropertiesSearchResults: ILandPropertyWithManager[];
  setRentalCommercialPropertiesSearchResults: Dispatch<
    SetStateAction<ICommercialRentalPropertyWithManager[]>
  >;
  setOnSaleCommercialPropertiesSearchResults: Dispatch<
    SetStateAction<ICommercialPropertyForSaleWithManager[]>
  >;
  setRentalResidentialPropertiesSearchResults: Dispatch<
    SetStateAction<IResidentialRentalPropertyWithManager[]>
  >;
  setOnSaleResidentialPropertiesSearchResults: Dispatch<
    SetStateAction<IResidentialPropertyForSaleWithManager[]>
  >;
  setStandPropertiesSearchResults: Dispatch<
    SetStateAction<IStandPropertyWithManager[]>
  >;
  setLandPropertiesSearchResults: Dispatch<
    SetStateAction<ILandPropertyWithManager[]>
  >;
}>({
  rentalCommercialPropertiesSearchResults: [],
  rentalResidentialPropertiesSearchResults: [],
  onSaleCommercialPropertiesSearchResults: [],
  onSaleResidentialPropertiesSearchResults: [],
  standPropertiesSearchResults: [],
  landPropertiesSearchResults: [],
  setRentalCommercialPropertiesSearchResults: () => {},
  setLandPropertiesSearchResults: () => {},
  setOnSaleCommercialPropertiesSearchResults: () => {},
  setOnSaleResidentialPropertiesSearchResults: () => {},
  setRentalResidentialPropertiesSearchResults: () => {},
  setStandPropertiesSearchResults: () => {},
});

export const SearchByLocationPropertyResultsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [landPropertiesSearchResults, setLandPropertiesSearchResults] =
    useState<ILandPropertyWithManager[]>([]);
  const [standPropertiesSearchResults, setStandPropertiesSearchResults] =
    useState<IStandPropertyWithManager[]>([]);
  const [
    onSaleCommercialPropertiesSearchResults,
    setOnSaleCommercialPropertiesSearchResults,
  ] = useState<ICommercialPropertyForSaleWithManager[]>([]);
  const [
    onSaleResidentialPropertiesSearchResults,
    setOnSaleResidentialPropertiesSearchResults,
  ] = useState<IResidentialPropertyForSaleWithManager[]>([]);
  const [
    rentalCommercialPropertiesSearchResults,
    setRentalCommercialPropertiesSearchResults,
  ] = useState<ICommercialRentalPropertyWithManager[]>([]);
  const [
    rentalResidentialPropertiesSearchResults,
    setRentalResidentialPropertiesSearchResults,
  ] = useState<IResidentialRentalPropertyWithManager[]>([]);
  return (
    <SearchByLocationPropertyResultsContext.Provider
      value={{
        landPropertiesSearchResults,
        standPropertiesSearchResults,
        onSaleCommercialPropertiesSearchResults,
        onSaleResidentialPropertiesSearchResults,
        rentalCommercialPropertiesSearchResults,
        rentalResidentialPropertiesSearchResults,
        setOnSaleCommercialPropertiesSearchResults,
        setOnSaleResidentialPropertiesSearchResults,
        setRentalCommercialPropertiesSearchResults,
        setRentalResidentialPropertiesSearchResults,
        setStandPropertiesSearchResults,
        setLandPropertiesSearchResults,
      }}
    >
      {children}
    </SearchByLocationPropertyResultsContext.Provider>
  );
};
export function useSearchByLocationPropertyResultsContext() {
  return useContext(SearchByLocationPropertyResultsContext);
}
