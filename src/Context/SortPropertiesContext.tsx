import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type ISortPropertiesOptions =
  | "rent_low_to_high"
  | "rent_high_to_low"
  | "price_low_to_high"
  | "price_high_to_low"
  | "rooms_to_rent_low_to_high"
  | "rooms_to_rent_high_to_low"
  | "total_rooms_low_to_high"
  | "total_rooms_high_to_low"
  | "size_low_to_high"
  | "size_high_to_low"
  | "year_built_oldest_to_new"
  | "year_built_newest_to_old"
  | "oldest"
  | "newest";

export type ISortResidentialRentalPropertiesOptions =
  | "rent_low_to_high"
  | "rent_high_to_low"
  | "rooms_to_rent_low_to_high"
  | "rooms_to_rent_high_to_low"
  | "total_rooms_low_to_high"
  | "total_rooms_high_to_low"
  | "size_low_to_high"
  | "size_high_to_low"
  | "year_built_oldest_to_new"
  | "year_built_newest_to_old"
  | "oldest"
  | "newest";

export type ISortCommercialRentalPropertiesOptions =
  | "rent_low_to_high"
  | "rent_high_to_low"
  | "rooms_to_rent_low_to_high"
  | "rooms_to_rent_high_to_low"
  | "total_rooms_low_to_high"
  | "total_rooms_high_to_low"
  | "size_low_to_high"
  | "size_high_to_low"
  | "year_built_oldest_to_new"
  | "year_built_newest_to_old"
  | "oldest"
  | "newest";

export type ISortResidentialForSalePropertiesOptions =
  | "price_low_to_high"
  | "price_high_to_low"
  | "total_rooms_low_to_high"
  | "total_rooms_high_to_low"
  | "size_low_to_high"
  | "size_high_to_low"
  | "year_built_oldest_to_new"
  | "year_built_newest_to_old"
  | "oldest"
  | "newest";

export type ISortCommercialForSalePropertiesOptions =
  | "price_low_to_high"
  | "price_high_to_low"
  | "total_rooms_low_to_high"
  | "total_rooms_high_to_low"
  | "size_low_to_high"
  | "size_high_to_low"
  | "year_built_oldest_to_new"
  | "year_built_newest_to_old"
  | "oldest"
  | "newest";

export type ISortStandOptions =
  | "price_low_to_high"
  | "price_high_to_low"
  | "size_low_to_high"
  | "size_high_to_low"
  | "oldest"
  | "newest";

export type ISortLandOptions =
  | "price_low_to_high"
  | "price_high_to_low"
  | "size_low_to_high"
  | "size_high_to_low"
  | "oldest"
  | "newest";

const SortPropertiesContext = createContext<{
  sortResidentialRentalPropertiesBy: ISortResidentialRentalPropertiesOptions;
  sortResidentialForSalePropertiesBy: ISortResidentialForSalePropertiesOptions;
  sortCommercialRentalPropertiesBy: ISortCommercialRentalPropertiesOptions;
  sortCommercialForSalePropertiesBy: ISortCommercialForSalePropertiesOptions;
  sortStandPropertiesBy: ISortStandOptions;
  sortLandPropertiesBy: ISortLandOptions;
  setSortResidentialRentalPropertiesBy: Dispatch<
    SetStateAction<ISortResidentialRentalPropertiesOptions>
  >;
  setSortResidentialForSalePropertiesBy: Dispatch<
    SetStateAction<ISortResidentialForSalePropertiesOptions>
  >;
  setSortCommercialRentalPropertiesBy: Dispatch<
    SetStateAction<ISortCommercialRentalPropertiesOptions>
  >;
  setSortCommercialForSalePropertiesBy: Dispatch<
    SetStateAction<ISortCommercialForSalePropertiesOptions>
  >;
  setSortStandPropertiesBy: Dispatch<SetStateAction<ISortStandOptions>>;
  setSortLandPropertiesBy: Dispatch<SetStateAction<ISortLandOptions>>;
}>({
  sortResidentialRentalPropertiesBy: "newest",
  sortCommercialForSalePropertiesBy: "newest",
  sortCommercialRentalPropertiesBy: "newest",
  sortLandPropertiesBy: "newest",
  sortResidentialForSalePropertiesBy: "newest",
  sortStandPropertiesBy: "newest",
  setSortCommercialForSalePropertiesBy: () => {},
  setSortCommercialRentalPropertiesBy: () => {},
  setSortLandPropertiesBy: () => {},
  setSortResidentialForSalePropertiesBy: () => {},
  setSortStandPropertiesBy: () => {},
  setSortResidentialRentalPropertiesBy: () => {},
});

export const SortPropertiesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [
    sortResidentialRentalPropertiesBy,
    setSortResidentialRentalPropertiesBy,
  ] = useState<ISortResidentialRentalPropertiesOptions>("newest");
  const [
    sortResidentialForSalePropertiesBy,
    setSortResidentialForSalePropertiesBy,
  ] = useState<ISortResidentialForSalePropertiesOptions>("newest");
  const [
    sortCommercialRentalPropertiesBy,
    setSortCommercialRentalPropertiesBy,
  ] = useState<ISortCommercialRentalPropertiesOptions>("newest");
  const [
    sortCommercialForSalePropertiesBy,
    setSortCommercialForSalePropertiesBy,
  ] = useState<ISortCommercialForSalePropertiesOptions>("newest");
  const [sortStandPropertiesBy, setSortStandPropertiesBy] =
    useState<ISortStandOptions>("newest");
  const [sortLandPropertiesBy, setSortLandPropertiesBy] =
    useState<ISortLandOptions>("newest");
  return (
    <SortPropertiesContext.Provider
      value={{
        sortResidentialRentalPropertiesBy,
        sortCommercialForSalePropertiesBy,
        sortCommercialRentalPropertiesBy,
        sortStandPropertiesBy,
        sortLandPropertiesBy,
        sortResidentialForSalePropertiesBy,
        setSortLandPropertiesBy,
        setSortStandPropertiesBy,
        setSortCommercialRentalPropertiesBy,
        setSortCommercialForSalePropertiesBy,
        setSortResidentialRentalPropertiesBy,
        setSortResidentialForSalePropertiesBy,
      }}
    >
      {children}
    </SortPropertiesContext.Provider>
  );
};

export function useSortPropertiesContext() {
  return useContext(SortPropertiesContext);
}
