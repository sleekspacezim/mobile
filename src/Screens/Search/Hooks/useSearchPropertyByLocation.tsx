import { View, Text, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import {
  searchCommercialPropertiesForSaleByLocationHttpFunc,
  searchCommercialRentalPropertiesByLocationHttpFunc,
  searchLandPropertiesByLocationHttpFunc,
  searchResidentialPropertiesForSaleByLocationHttpFunc,
  searchResidentialRentalPropertiesByLocationHttpFunc,
  searchStandsByLocationHttpFunc,
} from "@/src/HttpServices/Queries/Properties/SearchPropertiesHttpFuncs";
import { PropertyTypesEnum, SCREEN_BREAK_POINT } from "@/src/Utils/Constants";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import {
  IResidentialPropertyForSale,
  IResidentialPropertyForSaleWithManager,
} from "@/src/GlobalTypes/Property/Residential/ForSaleTypes";
import {
  IResidentialRentalProperty,
  IResidentialRentalPropertyWithManager,
} from "@/src/GlobalTypes/Property/Residential/RentalTypes";
import {
  ICommercialRentalProperty,
  ICommercialRentalPropertyWithManager,
} from "@/src/GlobalTypes/Property/Commercial/RentalTypes";
import {
  ICommercialPropertyForSale,
  ICommercialPropertyForSaleWithManager,
} from "@/src/GlobalTypes/Property/Commercial/ForSaleTypes";
import {
  ILandProperty,
  ILandPropertyWithManager,
} from "@/src/GlobalTypes/Property/Land/LandTypes";
import {
  IStandProperty,
  IStandPropertyWithManager,
} from "@/src/GlobalTypes/Property/Stand/StandTypes";

const useSearchPropertyByLocation = (
  propertyType: IPropertyType,
  searchedLocation: string
) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [areMorePropertiesLoading, setAreMorePropertiesLoading] =
    useState<boolean>(false);
  const [loadMorehttpError, setloadMoreHttpError] = useState<string>("");
  const [httpError, setHttpError] = useState<string>("");
  const [numberOfpages, setNumberOfPages] = useState<number>(0);
  const [totalProperties, setTotalProperties] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
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
  const { accessToken } = useAppSelector((state) => state.user.value);
  const { width } = useWindowDimensions();
  const pageLimit = width > SCREEN_BREAK_POINT ? 30 : 12;

  const searchPropertyByLocationQueryFn = () => {
    if (propertyType === PropertyTypesEnum.CommercialForSale)
      return searchCommercialPropertiesForSaleByLocationHttpFunc;
    else if (propertyType === PropertyTypesEnum.CommercialRentals)
      return searchCommercialRentalPropertiesByLocationHttpFunc;
    else if (propertyType === PropertyTypesEnum.ResidentialRentals)
      return searchResidentialRentalPropertiesByLocationHttpFunc;
    else if (propertyType === PropertyTypesEnum.ResidentialForSale)
      return searchResidentialPropertiesForSaleByLocationHttpFunc;
    else if (propertyType === PropertyTypesEnum.Land)
      return searchLandPropertiesByLocationHttpFunc;
    else return searchStandsByLocationHttpFunc;
  };

  const setProperties = (
    properties:
      | ICommercialPropertyForSaleWithManager[]
      | IStandPropertyWithManager[]
      | ICommercialRentalPropertyWithManager[]
      | IResidentialRentalPropertyWithManager[]
      | IResidentialPropertyForSaleWithManager[]
      | ILandPropertyWithManager[]
  ) => {
    if (propertyType === PropertyTypesEnum.CommercialForSale)
      return setOnSaleCommercialProperties(properties as ICommercialPropertyForSaleWithManager[])
    else if (propertyType === PropertyTypesEnum.CommercialRentals)
      return setRentalCommercialProperties(properties as ICommercialRentalPropertyWithManager[])
    else if (propertyType === PropertyTypesEnum.ResidentialRentals)
      return setRentalResidentialProperties(properties as IResidentialRentalPropertyWithManager[])
    else if (propertyType === PropertyTypesEnum.ResidentialForSale)
      return setOnSaleResidentialProperties(properties as IResidentialPropertyForSaleWithManager[])
    else if (propertyType === PropertyTypesEnum.Land)
      return setLandProperties(properties as ILandPropertyWithManager[]);
    else return setStandProperties(properties as IStandPropertyWithManager[]);
  };

  const addMoreProperties = (
    properties:
      | ICommercialPropertyForSaleWithManager[]
      | IStandPropertyWithManager[]
      | ICommercialRentalPropertyWithManager[]
      | IResidentialRentalPropertyWithManager[]
      | IResidentialPropertyForSaleWithManager[]
      | ILandPropertyWithManager[]
  ) => {
    if (propertyType === PropertyTypesEnum.CommercialForSale)
      return setOnSaleCommercialProperties([...onSaleCommercialProperties,...properties as ICommercialPropertyForSaleWithManager[]])
    else if (propertyType === PropertyTypesEnum.CommercialRentals)
      return setRentalCommercialProperties([...rentalCommercialProperties,...properties as ICommercialRentalPropertyWithManager[]])
    else if (propertyType === PropertyTypesEnum.ResidentialRentals)
      return setRentalResidentialProperties([...rentalResidentialProperties,...properties as IResidentialRentalPropertyWithManager[]])
    else if (propertyType === PropertyTypesEnum.ResidentialForSale)
      return setOnSaleResidentialProperties([...onSaleResidentialProperties,...properties as IResidentialPropertyForSaleWithManager[]])
    else if (propertyType === PropertyTypesEnum.Land)
      return setLandProperties([...landProperties,...properties as ILandPropertyWithManager[]]);
    else return setStandProperties([...standProperties,...properties as IStandPropertyWithManager[]]);
  };

  const fetchProperties = () => {
    searchPropertyByLocationQueryFn()({
      page: 1,
      pageLimit,
      isUserLoggedIn: accessToken ? true : false,
      accessToken,
      location: searchedLocation,
    })
      .then(({ data: { properties, totalPages, count } }) => {
        setProperties(properties)
        setNumberOfPages(totalPages);
        setTotalProperties(count);
        setPageNumber((value) => value + 1);
      })
      .catch((error: any) => {
        if (error.response?.data?.error) {
          if (error.response?.data?.error !== "") {
            setHttpError(error.response?.data?.error);
          } else setHttpError("Something went wrong");
        } else setHttpError("Something went wrong");
      })
      .finally(() => setIsLoading(false));
  };

  const refreshProperties = () => {
    searchPropertyByLocationQueryFn()({
      page: 1,
      pageLimit,
      isUserLoggedIn: accessToken ? true : false,
      accessToken,
      location: searchedLocation,
    })
      .then(({ data: { properties, totalPages, count } }) => {
        setProperties(properties)
        setNumberOfPages(totalPages);
        setTotalProperties(count);
        setPageNumber((value) => value + 1);
      })
      .catch((error: any) => {
        if (error.response?.data?.error) {
          if (error.response?.data?.error !== "") {
            setHttpError(error.response?.data?.error);
          } else setHttpError("Something went wrong");
        } else setHttpError("Something went wrong");
      })
      .finally(() => setIsRefreshing(false));
  };

  const loadMoreProperties = () => {
    setloadMoreHttpError("");
    if (numberOfpages >= pageNumber) {
      searchPropertyByLocationQueryFn()({
        page: pageNumber,
        isUserLoggedIn: accessToken ? true : false,
        accessToken,
        pageLimit,
        location: searchedLocation,
      })
        .then(({ data: { properties, totalPages, count } }) => {
          addMoreProperties(properties);
          setNumberOfPages(totalPages);
          setTotalProperties(count);
          setPageNumber((value) => value + 1);
        })
        .catch((error: any) => {
          if (error.response?.data?.error) {
            if (error.response?.data?.error !== "") {
              setloadMoreHttpError(error.response?.data?.error);
            } else setloadMoreHttpError("Something went wrong");
          } else setloadMoreHttpError("Something went wrong");
        })
        .finally(() => setAreMorePropertiesLoading(false));
    }
  };

  const handleRefresh = () => {
    setPageNumber(1);
    setIsRefreshing(true);
    refreshProperties();
  };

  useEffect(() => {
    fetchProperties();
  }, [accessToken,searchedLocation,propertyType]);

  useEffect(() => {
    if(httpError) setTotalProperties(0)
  }, [httpError]);

  return (
    <View>
      <Text>useSearchPropertyByLocation</Text>
    </View>
  );
};

export default useSearchPropertyByLocation;
