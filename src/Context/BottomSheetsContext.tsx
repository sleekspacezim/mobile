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
  | "Bedrooms"
  | "Bathrooms"
  | "Rooms to rent"
  | "Type"
  | "All Filters";

type IPropertyFiltersBottomSheet = {
  type: IPropertyFilterType;
  isOpen: boolean;
};

const BottomSheetsContext = createContext<{
  isPropertyCardBottomSheetOpen: boolean;
  propertyFiltersBottomSheet: IPropertyFiltersBottomSheet;
  isUserProfileBottomSheetOpen: boolean;
  setIsUserProfileBottomSheetOpen: Dispatch<SetStateAction<boolean>>;
  setPropertyFiltersBottomSheet: Dispatch<
    SetStateAction<IPropertyFiltersBottomSheet>
  >;
  setIsPropertyCardBottomSheetOpen: Dispatch<SetStateAction<boolean>>;
}>({
  isPropertyCardBottomSheetOpen: false,
  propertyFiltersBottomSheet: {
    type: "All Filters",
    isOpen: false,
  },
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
  const [
    propertyFiltersBottomSheet,
    setPropertyFiltersBottomSheet,
  ] = useState<IPropertyFiltersBottomSheet>({
    type: "All Filters",
    isOpen: false,
  });
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
