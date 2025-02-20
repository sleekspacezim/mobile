import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from "react";

import { ICommercialPropertyForSaleWithManager } from "../GlobalTypes/Property/Commercial/ForSaleTypes";
import { ICommercialRentalPropertyWithManager } from "../GlobalTypes/Property/Commercial/RentalTypes";
import { ILandPropertyWithManager } from "../GlobalTypes/Property/Land/LandTypes";
import { IResidentialPropertyForSaleWithManager } from "../GlobalTypes/Property/Residential/ForSaleTypes";
import { IResidentialRentalPropertyWithManager } from "../GlobalTypes/Property/Residential/RentalTypes";
import { IStandPropertyWithManager } from "../GlobalTypes/Property/Stand/StandTypes";

const PropertyContext = createContext<{
  rentalCommercialProperty: ICommercialRentalPropertyWithManager | undefined;
  onSaleCommercialProperty: ICommercialPropertyForSaleWithManager | undefined;
  rentalResidentialProperty:
    | IResidentialRentalPropertyWithManager
    | undefined;
  onSaleResidentialProperty:
    | IResidentialPropertyForSaleWithManager
    | undefined;
  standProperty: IStandPropertyWithManager | undefined;
  landProperty: ILandPropertyWithManager | undefined;
  setRentalCommercialProperty: Dispatch<
    SetStateAction<ICommercialRentalPropertyWithManager | undefined>
  >;
  setOnSaleCommercialProperty: Dispatch<
    SetStateAction<ICommercialPropertyForSaleWithManager | undefined>
  >;
  setRentalResidentialProperty: Dispatch<
    SetStateAction<IResidentialRentalPropertyWithManager | undefined>
  >;
  setOnSaleResidentialProperty: Dispatch<
    SetStateAction<IResidentialPropertyForSaleWithManager | undefined>
  >;
  setStandProperty: Dispatch<
    SetStateAction<IStandPropertyWithManager | undefined>
  >;
  setLandProperty: Dispatch<
    SetStateAction<ILandPropertyWithManager | undefined>
  >;
}>({
  rentalCommercialProperty: undefined,
  rentalResidentialProperty: undefined,
  onSaleCommercialProperty: undefined,
  onSaleResidentialProperty: undefined,
  standProperty: undefined,
  landProperty: undefined,
  setRentalCommercialProperty: () => {},
  setLandProperty: () => {},
  setOnSaleCommercialProperty: () => {},
  setOnSaleResidentialProperty: () => {},
  setRentalResidentialProperty: () => {},
  setStandProperty: () => {},
});

export const PropertyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [landProperty, setLandProperty] = useState<
    ILandPropertyWithManager | undefined
  >();
  const [standProperty, setStandProperty] = useState<
    IStandPropertyWithManager | undefined
  >();
  const [onSaleCommercialProperty, setOnSaleCommercialProperty] = useState<
    ICommercialPropertyForSaleWithManager | undefined
  >();
  const [onSaleResidentialProperty, setOnSaleResidentialProperty] =
    useState<IResidentialPropertyForSaleWithManager | undefined>();
  const [rentalCommercialProperty, setRentalCommercialProperty] = useState<
    ICommercialRentalPropertyWithManager | undefined
  >();
  const [rentalResidentialProperty, setRentalResidentialProperty] =
    useState<IResidentialRentalPropertyWithManager | undefined>();
  return (
    <PropertyContext.Provider
      value={{
        landProperty,
        standProperty,
        onSaleCommercialProperty,
        onSaleResidentialProperty,
        rentalCommercialProperty,
        rentalResidentialProperty,
        setOnSaleCommercialProperty,
        setOnSaleResidentialProperty,
        setRentalCommercialProperty,
        setRentalResidentialProperty,
        setStandProperty,
        setLandProperty,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};
export function usePropertyContext() {
  return useContext(PropertyContext);
}
