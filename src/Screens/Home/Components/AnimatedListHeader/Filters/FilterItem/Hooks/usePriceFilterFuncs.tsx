import React from "react";

import {
  IPriceFilter,
  usePropertyFiltersContext,
} from "@/src/Context/PropertyFiltersContext";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { red, gray } from "@/src/Theme/Colors";
import { PropertyTypesEnum } from "@/src/Utils/Constants";

const usePriceFilterFuncs = (
  price: IPriceFilter,
  propertyType: IPropertyType,
  setPrice: React.Dispatch<React.SetStateAction<IPriceFilter>>
) => {
  const { priceFilter, setPriceFilter } = usePropertyFiltersContext();
  const borderColor = () => {
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      if (
        price.commercialForSale.min !== 0 &&
        price.commercialForSale.min >= price.commercialForSale.max
      ) {
        return red;
      } else return gray;
    } else if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      if (
        price.residentialForSale.min !== 0 &&
        price.residentialForSale.min >= price.residentialForSale.max
      ) {
        return red;
      } else return gray;
    } else if (propertyType === PropertyTypesEnum.Stands) {
      if (price.stand.min !== 0 && price.stand.min >= price.stand.max) {
        return red;
      } else return gray;
    } else {
      if (price.land.min !== 0 && price.land.min >= price.land.max) {
        return red;
      } else return gray;
    }
  };

  const priceMin = () => {
    if (propertyType === PropertyTypesEnum.CommercialForSale)
      return price.commercialForSale.min;
    else if (propertyType === PropertyTypesEnum.ResidentialForSale)
      return price.residentialForSale.min;
    else if (propertyType === PropertyTypesEnum.Stands) return price.stand.min;
    else return price.land.min;
  };

  const priceMax = () => {
    if (propertyType === PropertyTypesEnum.CommercialForSale)
      return price.commercialForSale.max;
    else if (propertyType === PropertyTypesEnum.ResidentialForSale)
      return price.residentialForSale.max;
    else if (propertyType === PropertyTypesEnum.Stands) return price.stand.max;
    else return price.land.max;
  };

  const setPriceMin = (value: number) => {
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      setPrice({
        ...price,
        commercialForSale: { ...price.commercialForSale, min: value },
      });
    } else if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      setPrice({
        ...price,
        residentialForSale: { ...price.residentialForSale, min: value },
      });
    } else if (propertyType === PropertyTypesEnum.Stands) {
      setPrice({ ...price, stand: { ...price.stand, min: value } });
    } else {
      setPrice({ ...price, land: { ...price.land, min: value } });
    }
  };

  const setPriceMax = (value: number) => {
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      setPrice({
        ...price,
        commercialForSale: { ...price.commercialForSale, max: value },
      });
    } else if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      setPrice({
        ...price,
        residentialForSale: { ...price.residentialForSale, max: value },
      });
    } else if (propertyType === PropertyTypesEnum.Stands) {
      setPrice({ ...price, stand: { ...price.stand, max: value } });
    } else {
      setPrice({ ...price, land: { ...price.land, max: value } });
    }
  };

  const resetPriceFilter = () => {
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      setPrice({
        ...price,
        commercialForSale: {
          max: 0,
          min: 0,
        },
      });
      setPriceFilter({
        ...priceFilter,
        commercialForSale: {
          max: 0,
          min: 0,
        },
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      setPrice({
        ...price,
        residentialForSale: {
          max: 0,
          min: 0,
        },
      });
      setPriceFilter({
        ...priceFilter,
        residentialForSale: {
          max: 0,
          min: 0,
        },
      });
    }
    if (propertyType === PropertyTypesEnum.Stands) {
      setPrice({
        ...price,
        stand: {
          max: 0,
          min: 0,
        },
      });
      setPriceFilter({
        ...priceFilter,
        stand: {
          max: 0,
          min: 0,
        },
      });
    }
    if (propertyType === PropertyTypesEnum.Land) {
      setPrice({
        ...price,
        land: {
          max: 0,
          min: 0,
        },
      });
      setPriceFilter({
        ...priceFilter,
        land: {
          max: 0,
          min: 0,
        },
      });
    }
  };

  const applyPriceFilter = () => {
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      if (price.commercialForSale.min <= price.commercialForSale.max) {
        if (
          price.commercialForSale.max > 0 ||
          price.commercialForSale.min > 0
        ) {
          setPriceFilter({
            ...priceFilter,
            commercialForSale: {
              min: price.commercialForSale.min,
              max: price.commercialForSale.max,
            },
          });
        }
      }
    }
    if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      if (price.residentialForSale.min <= price.residentialForSale.max) {
        if (
          price.residentialForSale.max > 0 ||
          price.residentialForSale.min > 0
        ) {
          setPriceFilter({
            ...priceFilter,
            residentialForSale: {
              min: price.residentialForSale.min,
              max: price.residentialForSale.max,
            },
          });
        }
      }
    }
    if (propertyType === PropertyTypesEnum.Land) {
      if (price.land.min <= price.land.max) {
        if (price.land.max > 0 || price.land.min > 0) {
          setPriceFilter({
            ...priceFilter,
            land: {
              min: price.land.min,
              max: price.land.max,
            },
          });
        }
      }
    }
    if (propertyType === PropertyTypesEnum.Stands) {
      if (price.stand.min <= price.stand.max) {
        if (price.stand.max > 0 || price.stand.min > 0) {
          setPriceFilter({
            ...priceFilter,
            stand: {
              min: price.stand.min,
              max: price.stand.max,
            },
          });
        }
      }
    }
  };

  return {
    priceMax,
    priceMin,
    setPriceMax,
    setPriceMin,
    borderColor,
    resetPriceFilter,
    applyPriceFilter,
  };
};

export default usePriceFilterFuncs;
