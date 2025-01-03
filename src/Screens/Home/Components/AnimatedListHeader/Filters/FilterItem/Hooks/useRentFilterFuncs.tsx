import {
  IRentFilter,
  usePropertyFiltersContext,
} from "@/src/Context/PropertyFiltersContext";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { red, gray } from "@/src/Theme/Colors";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import React from "react";

const useRentFilterFuncs = (
  rent: IRentFilter,
  propertyType: IPropertyType,
  setRent: React.Dispatch<React.SetStateAction<IRentFilter>>
) => {
  const { rentFilter, setRentFilter } = usePropertyFiltersContext();
  const borderColor = () => {
    if (propertyType === PropertyTypesEnum.CommercialRentals) {
      if (
        rent.commercialRentals.min !== 0 &&
        rent.commercialRentals.min >= rent.commercialRentals.max
      ) {
        return red;
      } else return gray;
    } else {
      if (
        rent.residentialRentals.min !== 0 &&
        rent.residentialRentals.min >= rent.residentialRentals.max
      ) {
        return red;
      } else return gray;
    }
  };

  const rentMin = () => {
    if (propertyType === PropertyTypesEnum.CommercialRentals)
      return rent.commercialRentals.min;
    else return rent.residentialRentals.min;
  };

  const rentMax = () => {
    if (propertyType === PropertyTypesEnum.CommercialRentals)
      return rent.commercialRentals.max;
    else return rent.residentialRentals.max;
  };

  const setRentMin = (value: number) => {
    if (propertyType === PropertyTypesEnum.CommercialRentals) {
      setRent({
        ...rent,
        commercialRentals: {
          ...rent.commercialRentals,
          min: value,
        },
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialRentals) {
      setRent({
        ...rent,
        residentialRentals: {
          ...rent.residentialRentals,
          min: value,
        },
      });
    }
  };

  const setRentMax = (value: number) => {
    if (propertyType === PropertyTypesEnum.CommercialRentals) {
      setRent({
        ...rent,
        commercialRentals: {
          ...rent.commercialRentals,
          max: value,
        },
      });
    } else {
      setRent({
        ...rent,
        residentialRentals: {
          ...rent.residentialRentals,
          max: value,
        },
      });
    }
  };

  const applyRentFilter = () => {
    if (propertyType === PropertyTypesEnum.CommercialRentals) {
      if (rent.commercialRentals.min <= rent.commercialRentals.max) {
        if (rent.commercialRentals.max > 0 || rent.commercialRentals.min > 0) {
          setRentFilter({
            ...rentFilter,
            commercialRentals: {
              max: rent.commercialRentals.max,
              min: rent.commercialRentals.min,
            },
          });
        }
      }
    }
    if (propertyType === PropertyTypesEnum.ResidentialRentals) {
      if (rent.residentialRentals.min <= rent.residentialRentals.max) {
        if (
          rent.residentialRentals.max > 0 ||
          rent.residentialRentals.min > 0
        ) {
          setRentFilter({
            ...rentFilter,
            residentialRentals: {
              max: rent.residentialRentals.max,
              min: rent.residentialRentals.min,
            },
          });
        }
      }
    }
  };

  const resetRentFilter = () => {
    if (propertyType === PropertyTypesEnum.CommercialRentals) {
      setRent({
        ...rent,
        commercialRentals: {
          max: 0,
          min: 0,
        },
      });
      setRentFilter({
        ...rentFilter,
        commercialRentals: {
          max: 0,
          min: 0,
        },
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialRentals) {
      setRent({
        ...rent,
        residentialRentals: {
          max: 0,
          min: 0,
        },
      });
      setRentFilter({
        ...rentFilter,
        residentialRentals: {
          max: 0,
          min: 0,
        },
      });
    }
  };

  return {
    borderColor,
    rentMax,
    rentMin,
    setRentMax,
    setRentMin,
    applyRentFilter,
    resetRentFilter,
  };
};

export default useRentFilterFuncs;
