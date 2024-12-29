import React from "react";

import {
  ICurrencyFilter,
  usePropertyFiltersContext,
} from "@/src/Context/PropertyFiltersContext";
import { ICurrency, IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { PropertyTypesEnum } from "@/src/Utils/Constants";

const useCurrencyFilterFuncs = (
  currency: ICurrencyFilter,
  propertyType: IPropertyType,
  setCurrency: React.Dispatch<React.SetStateAction<ICurrencyFilter>>
) => {
  const { setCurrencyFilter, currencyFilter } = usePropertyFiltersContext();
  const handleSelectCurrency = (currencyType: ICurrency) => {
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      setCurrency({ ...currency, commercialForsale: currencyType });
    } else if (propertyType === PropertyTypesEnum.CommercialRentals) {
      setCurrency({ ...currency, commercialRentals: currencyType });
    } else if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      setCurrency({
        ...currency,
        residentialForsale: currencyType,
      });
    } else if (propertyType === PropertyTypesEnum.ResidentialRentals) {
      setCurrency({
        ...currency,
        residentialRentals: currencyType,
      });
    } else if (propertyType === PropertyTypesEnum.Stands) {
      setCurrency({ ...currency, stand: currencyType });
    } else {
      setCurrency({ ...currency, land: currencyType });
    }
  };

  const color = (
    currencyType: ICurrency,
    highlightedCurrencyColor: string,
    unhighlightedCurrencyColor: string
  ) => {
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      if (currency.commercialForsale === currencyType)
        return highlightedCurrencyColor;
      else return unhighlightedCurrencyColor;
    } else if (propertyType === PropertyTypesEnum.CommercialRentals) {
      if (currency.commercialRentals === currencyType)
        return highlightedCurrencyColor;
      else return unhighlightedCurrencyColor;
    } else if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      if (currency.residentialForsale === currencyType)
        return highlightedCurrencyColor;
      else return unhighlightedCurrencyColor;
    } else if (propertyType === PropertyTypesEnum.ResidentialRentals) {
      if (currency.residentialRentals === currencyType)
        return highlightedCurrencyColor;
      else return unhighlightedCurrencyColor;
    } else if (propertyType === PropertyTypesEnum.Stands) {
      if (currency.stand === currencyType) return highlightedCurrencyColor;
      else return unhighlightedCurrencyColor;
    } else {
      if (currency.land === currencyType) return highlightedCurrencyColor;
      else return unhighlightedCurrencyColor;
    }
  };

  const resetCurrencyFilter = () => {
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      setCurrencyFilter({
        ...currencyFilter,
        commercialForsale: "",
      });
      setCurrency({
        ...currencyFilter,
        commercialForsale: "",
      });
    }
    if (propertyType === PropertyTypesEnum.CommercialRentals) {
      setCurrencyFilter({
        ...currencyFilter,
        commercialRentals: "",
      });
      setCurrency({
        ...currencyFilter,
        commercialRentals: "",
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      setCurrencyFilter({
        ...currencyFilter,
        residentialForsale: "",
      });
      setCurrency({
        ...currencyFilter,
        residentialForsale: "",
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialRentals) {
      setCurrencyFilter({
        ...currencyFilter,
        residentialRentals: "",
      });
      setCurrency({
        ...currencyFilter,
        residentialRentals: "",
      });
    }
    if (propertyType === PropertyTypesEnum.Stands) {
      setCurrencyFilter({
        ...currencyFilter,
        stand: "",
      });
      setCurrency({
        ...currencyFilter,
        stand: "",
      });
    }
    if (propertyType === PropertyTypesEnum.Land) {
      setCurrencyFilter({
        ...currencyFilter,
        land: "",
      });
      setCurrency({
        ...currencyFilter,
        land: "",
      });
    }
  };

  const applyCurrencyFilter = () => {
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      setCurrencyFilter({
        ...currencyFilter,
        commercialForsale: currency.commercialForsale,
      });
    }
    if (propertyType === PropertyTypesEnum.CommercialRentals) {
      setCurrencyFilter({
        ...currencyFilter,
        commercialRentals: currency.commercialRentals,
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      setCurrencyFilter({
        ...currencyFilter,
        residentialForsale: currency.residentialForsale,
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialRentals) {
      setCurrencyFilter({
        ...currencyFilter,
        residentialRentals: currency.residentialRentals,
      });
    }
    if (propertyType === PropertyTypesEnum.Stands) {
      setCurrencyFilter({
        ...currencyFilter,
        stand: currency.stand,
      });
    }
    if (propertyType === PropertyTypesEnum.Land) {
      setCurrencyFilter({
        ...currencyFilter,
        land: currency.land,
      });
    }
  };

  return {
    handleSelectCurrency,
    color,
    applyCurrencyFilter,
    resetCurrencyFilter,
  };
};

export default useCurrencyFilterFuncs;
