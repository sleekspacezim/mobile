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

const FavoritesPropertiesContext = createContext<{
  rentalCommercialFavoriteProperties: ICommercialRentalPropertyWithManager[];
  onSaleCommercialFavoriteProperties: ICommercialPropertyForSaleWithManager[];
  rentalResidentialFavoriteProperties: IResidentialRentalPropertyWithManager[];
  onSaleResidentialFavoriteProperties: IResidentialPropertyForSaleWithManager[];
  standFavoriteProperties: IStandPropertyWithManager[];
  landFavoriteProperties: ILandPropertyWithManager[];
  setRentalCommercialFavoriteProperties: Dispatch<
    SetStateAction<ICommercialRentalPropertyWithManager[]>
  >;
  setOnSaleCommercialFavoriteProperties: Dispatch<
    SetStateAction<ICommercialPropertyForSaleWithManager[]>
  >;
  setRentalResidentialFavoriteProperties: Dispatch<
    SetStateAction<IResidentialRentalPropertyWithManager[]>
  >;
  setOnSaleResidentialFavoriteProperties: Dispatch<
    SetStateAction<IResidentialPropertyForSaleWithManager[]>
  >;
  setStandFavoriteProperties: Dispatch<
    SetStateAction<IStandPropertyWithManager[]>
  >;
  setLandFavoriteProperties: Dispatch<
    SetStateAction<ILandPropertyWithManager[]>
  >;
}>({
  rentalCommercialFavoriteProperties: [],
  rentalResidentialFavoriteProperties: [],
  onSaleCommercialFavoriteProperties: [],
  onSaleResidentialFavoriteProperties: [],
  standFavoriteProperties: [],
  landFavoriteProperties: [],
  setRentalCommercialFavoriteProperties: () => {},
  setLandFavoriteProperties: () => {},
  setOnSaleCommercialFavoriteProperties: () => {},
  setOnSaleResidentialFavoriteProperties: () => {},
  setRentalResidentialFavoriteProperties: () => {},
  setStandFavoriteProperties: () => {},
});

export const FavoritesPropertiesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [landFavoriteProperties, setLandFavoriteProperties] = useState<
    ILandPropertyWithManager[]
  >([]);
  const [standFavoriteProperties, setStandFavoriteProperties] = useState<
    IStandPropertyWithManager[]
  >([]);
  const [
    onSaleCommercialFavoriteProperties,
    setOnSaleCommercialFavoriteProperties,
  ] = useState<ICommercialPropertyForSaleWithManager[]>([]);
  const [
    onSaleResidentialFavoriteProperties,
    setOnSaleResidentialFavoriteProperties,
  ] = useState<IResidentialPropertyForSaleWithManager[]>([]);
  const [
    rentalCommercialFavoriteProperties,
    setRentalCommercialFavoriteProperties,
  ] = useState<ICommercialRentalPropertyWithManager[]>([]);
  const [
    rentalResidentialFavoriteProperties,
    setRentalResidentialFavoriteProperties,
  ] = useState<IResidentialRentalPropertyWithManager[]>([]);
  return (
    <FavoritesPropertiesContext.Provider
      value={{
        landFavoriteProperties,
        standFavoriteProperties,
        onSaleCommercialFavoriteProperties,
        onSaleResidentialFavoriteProperties,
        rentalCommercialFavoriteProperties,
        rentalResidentialFavoriteProperties,
        setOnSaleCommercialFavoriteProperties,
        setOnSaleResidentialFavoriteProperties,
        setRentalCommercialFavoriteProperties,
        setRentalResidentialFavoriteProperties,
        setStandFavoriteProperties,
        setLandFavoriteProperties,
      }}
    >
      {children}
    </FavoritesPropertiesContext.Provider>
  );
};
export function useFavoritesPropertiesContext() {
  return useContext(FavoritesPropertiesContext);
}
