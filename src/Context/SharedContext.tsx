import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { IPropertyType } from "../GlobalTypes/Property/Common";

export type ISelectedPropertyDetails = {
  id: number;
  managerId: number;
  type: IPropertyType | "";
  isFavorite: boolean;
  userId:number;
};

const SharedContext = createContext<{
  openReportModal: boolean;
  selectedProperty: ISelectedPropertyDetails;
  setSelectedProperty: Dispatch<SetStateAction<ISelectedPropertyDetails>>;
  setOpenReportModal: Dispatch<SetStateAction<boolean>>;
}>({
  openReportModal: false,
  selectedProperty: {
    id: 0,
    managerId: 0,
    userId:0,
    type: "",
    isFavorite:false
  },
  setSelectedProperty: () => {},
  setOpenReportModal: () => {},
});

export const SharedContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openReportModal, setOpenReportModal] = useState<boolean>(false);
  const [selectedProperty, setSelectedProperty] =
    useState<ISelectedPropertyDetails>({
      id: 0,
      managerId: 0,
      userId:0,
      type: "",
      isFavorite:false
    });
  return (
    <SharedContext.Provider
      value={{
        openReportModal,
        selectedProperty,
        setSelectedProperty,
        setOpenReportModal,
      }}
    >
      {children}
    </SharedContext.Provider>
  );
};
export function useSharedContext() {
  return useContext(SharedContext);
}
