import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

import {
  ICurrency,
  IDimensions,
} from "../GlobalTypes/Property/Common";

type IMinMax = {
  min:number,
  max:number
}
export type IRentFilter = {
  residentialRentals:IMinMax,
  commercialRentals:IMinMax
};

export type IPriceFilter = {
  residentialForSale:IMinMax,
  commercialForSale:IMinMax,
  stand:IMinMax,
  land:IMinMax
};

export type IBedroomsFilter = {
  residentialForsaleFigure:string
  residentialRentalsFigure:string
};

export type ITotalRoomsFilter = {
  residentialForsaleFigure:string
  residentialRentalsFigure:string
  commercialForsaleFigure:string
  commercialRentalsFigure:string
};

export type ICurrencyFilter = {
  residentialForsale:ICurrency | ""
  residentialRentals:ICurrency | ""
  commercialForsale:ICurrency | ""
  commercialRentals:ICurrency | ""
  stand: ICurrency | "";
  land:ICurrency | "";
};

export type IBathroomsFilter = {
  residentialForsaleFigure:string
  residentialRentalsFigure:string
};

export type IRoomsToRentFilter = {
  residentialRentalsFigure:string
  commercialRentalsFigure:string
};

export type IPropertyStructureTypeFilter = {
  residentialForsale:string
  residentialRentals:string
  commercialForsale:string
  commercialRentals:string
  stand: string;
  land:string;
};

type ISize = {
  figure: string;
  dimension:IDimensions|"";
}

export type IPropertySizeFilter = {
  residentialForsale:ISize
  residentialRentals:ISize
  commercialForsale:ISize
  commercialRentals:ISize
  stand: ISize;
  land:ISize;
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
    residentialForsale:"",
    residentialRentals:"",
    commercialForsale:"",
    commercialRentals:"",
    stand:"",
    land:""
  },
  totalRoomsFilter: {
    residentialForsaleFigure:"",
    residentialRentalsFigure:"",
    commercialForsaleFigure:"",
    commercialRentalsFigure:""
  },
  priceFilter: {
    residentialForSale:{
      max:0,
      min:0
    },
    commercialForSale:{
      max:0,
      min:0
    },
    stand:{
      max:0,
      min:0
    },
    land:{
      max:0,
      min:0
    }
  },
  rentFilter: {
    residentialRentals:{
      max:0,
      min:0
    },
    commercialRentals:{
      max:0,
      min:0
    }
  },
  propertySizeFilter: {
    residentialForsale:{
      figure:"",
      dimension:""
    },
    residentialRentals:{
      figure:"",
      dimension:""
    },
    commercialForsale:{
      figure:"",
      dimension:""
    },
    commercialRentals:{
      figure:"",
      dimension:""
    },
    stand:{
      figure:"",
      dimension:""
    },
    land:{
      figure:"",
      dimension:""
    },
  },
  propertyStructureTypeFilter: {
    residentialForsale:"",
    residentialRentals:"",
    commercialForsale:"",
    commercialRentals:"",
    stand:"",
    land:""
  },
  bathroomsFilter: {
    residentialForsaleFigure:"",
    residentialRentalsFigure:""
  },
  bedroomsFilter: {
    residentialForsaleFigure:"",
    residentialRentalsFigure:""
  },
  roomsToRentFilter: {
    residentialRentalsFigure:"",
    commercialRentalsFigure:""
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
    residentialForsale:"",
    residentialRentals:"",
    commercialForsale:"",
    commercialRentals:"",
    stand:"",
    land:""
  });
  const [totalRoomsFilter, setTotalRoomsFilter] = useState<ITotalRoomsFilter>({
    residentialForsaleFigure:"",
    residentialRentalsFigure:"",
    commercialForsaleFigure:"",
    commercialRentalsFigure:""
  });
  const [priceFilter, setPriceFilter] = useState<IPriceFilter>({
    residentialForSale:{
      max:0,
      min:0
    },
    commercialForSale:{
      max:0,
      min:0
    },
    stand:{
      max:0,
      min:0
    },
    land:{
      max:0,
      min:0
    }
  });

  const [propertySizeFilter, setPropertySizeFilter] =
    useState<IPropertySizeFilter>({
      residentialForsale:{
        figure:"",
        dimension:"m²"
      },
      residentialRentals:{
        figure:"",
        dimension:"m²"
      },
      commercialForsale:{
        figure:"",
        dimension:"m²"
      },
      commercialRentals:{
        figure:"",
        dimension:"m²"
      },
      stand:{
        figure:"",
        dimension:"m²"
      },
      land:{
        figure:"",
        dimension:"m²"
      },
    });

  const [propertyStructureTypeFilter, setPropertyStructureTypeFilter] =
    useState<IPropertyStructureTypeFilter>({
      residentialForsale:"",
    residentialRentals:"",
    commercialForsale:"",
    commercialRentals:"",
    stand:"",
    land:""
    });
  const [roomsToRentFilter, setRoomsToRentFilter] =
    useState<IRoomsToRentFilter>({
      residentialRentalsFigure:"",
    commercialRentalsFigure:""
    });

  const [bedroomsFilter, setBedroomsFilter] = useState<IBedroomsFilter>({
    residentialForsaleFigure: "",
    residentialRentalsFigure: "",
  });

  const [bathroomsFilter, setBathroomsFilter] = useState<IBathroomsFilter>({
    residentialForsaleFigure:"",
    residentialRentalsFigure:""
  });

  const [rentFilter, setRentFilter] = useState<IRentFilter>({
    residentialRentals:{
      max:0,
      min:0
    },
    commercialRentals:{
      max:0,
      min:0
    }
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
