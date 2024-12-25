import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type IPropertyFilterType =
  | "Price"
  | "Size"
  | "Rent"
  | "Total rooms"
  | "Bedrooms"
  | "Bathrooms"
  | "Currency"
  | "Rooms to rent"
  | "Type"
  | ""
  | "All Filters";

const BottomSheetsContext = createContext<{
  isPropertyCardBottomSheetOpen: boolean;
  propertyFiltersBottomSheet: IPropertyFilterType;
  isUserProfileBottomSheetOpen: boolean;
  setIsUserProfileBottomSheetOpen: Dispatch<SetStateAction<boolean>>;
  setPropertyFiltersBottomSheet: Dispatch<SetStateAction<IPropertyFilterType>>;
  setIsPropertyCardBottomSheetOpen: Dispatch<SetStateAction<boolean>>;
}>({
  isPropertyCardBottomSheetOpen: false,
  propertyFiltersBottomSheet: "",
  isUserProfileBottomSheetOpen: false,
  setIsPropertyCardBottomSheetOpen: () => {},
  setPropertyFiltersBottomSheet: () => {},
  setIsUserProfileBottomSheetOpen: () => {},
});

export const BottomSheetsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isUserProfileBottomSheetOpen, setIsUserProfileBottomSheetOpen] =
    useState<boolean>(false);
  const [propertyFiltersBottomSheet, setPropertyFiltersBottomSheet] =
    useState<IPropertyFilterType>("");
  const [isPropertyCardBottomSheetOpen, setIsPropertyCardBottomSheetOpen] =
    useState<boolean>(false);
  return (
    <BottomSheetsContext.Provider
      value={{
        isPropertyCardBottomSheetOpen,
        propertyFiltersBottomSheet,
        isUserProfileBottomSheetOpen,
        setIsPropertyCardBottomSheetOpen,
        setPropertyFiltersBottomSheet,
        setIsUserProfileBottomSheetOpen,
      }}
    >
      {children}
    </BottomSheetsContext.Provider>
  );
};

export function useBottomSheetsContext() {
  return useContext(BottomSheetsContext);
}
