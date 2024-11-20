import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { ICommercialRentalPropertyWithManager } from "../GlobalTypes/Property/Commercial/RentalTypes";
import { ICommercialPropertyForSaleWithManager } from "../GlobalTypes/Property/Commercial/ForSaleTypes";
import { IResidentialRentalPropertyWithManager } from "../GlobalTypes/Property/Residential/RentalTypes";
import { IResidentialPropertyForSaleWithManager } from "../GlobalTypes/Property/Residential/ForSaleTypes";
import { IStandPropertyWithManager } from "../GlobalTypes/Property/Stand/StandTypes";
import { ILandPropertyWithManager } from "../GlobalTypes/Property/Land/LandTypes";


const PropertiesContext = createContext<{
  rentalCommercialProperties: ICommercialRentalPropertyWithManager[];
  onSaleCommercialProperties: ICommercialPropertyForSaleWithManager[];
  rentalResidentialProperties: IResidentialRentalPropertyWithManager[];
  onSaleResidentialProperties: IResidentialPropertyForSaleWithManager[];
  standProperties: IStandPropertyWithManager[];
  landProperties: ILandPropertyWithManager[];
  setRentalCommercialProperties: Dispatch<
    SetStateAction<ICommercialRentalPropertyWithManager[]>
  >;
  setOnSaleCommercialProperties: Dispatch<
    SetStateAction<ICommercialPropertyForSaleWithManager[]>
  >;
  setRentalResidentialProperties: Dispatch<
    SetStateAction<IResidentialRentalPropertyWithManager[]>
  >;
  setOnSaleResidentialProperties: Dispatch<
    SetStateAction<IResidentialPropertyForSaleWithManager[]>
  >;
  setStandProperties: Dispatch<SetStateAction<IStandPropertyWithManager[]>>;
  setLandProperties: Dispatch<SetStateAction<ILandPropertyWithManager[]>>;
}>({
  rentalCommercialProperties: [],
  rentalResidentialProperties: [],
  onSaleCommercialProperties: [],
  onSaleResidentialProperties: [],
  standProperties: [],
  landProperties: [],
  setRentalCommercialProperties: () => {},
  setLandProperties: () => {},
  setOnSaleCommercialProperties: () => {},
  setOnSaleResidentialProperties: () => {},
  setRentalResidentialProperties: () => {},
  setStandProperties: () => {},
});

export const PropertiesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [landProperties, setLandProperties] = useState<
    ILandPropertyWithManager[]
  >([]);
  const [standProperties, setStandProperties] = useState<
    IStandPropertyWithManager[]
  >([]);
  const [onSaleCommercialProperties, setOnSaleCommercialProperties] = useState<
    ICommercialPropertyForSaleWithManager[]
  >([]);
  const [onSaleResidentialProperties, setOnSaleResidentialProperties] =
    useState<IResidentialPropertyForSaleWithManager[]>([]);
  const [rentalCommercialProperties, setRentalCommercialProperties] = useState<
    ICommercialRentalPropertyWithManager[]
  >([]);
  const [rentalResidentialProperties, setRentalResidentialProperties] =
    useState<IResidentialRentalPropertyWithManager[]>([]);
  return (
    <PropertiesContext.Provider
      value={{
        landProperties,
        standProperties,
        onSaleCommercialProperties,
        onSaleResidentialProperties,
        rentalCommercialProperties,
        rentalResidentialProperties,
        setOnSaleCommercialProperties,
        setOnSaleResidentialProperties,
        setRentalCommercialProperties,
        setRentalResidentialProperties,
        setStandProperties,
        setLandProperties,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
};
export function usePropertiesContext() {
  return useContext(PropertiesContext);
}
