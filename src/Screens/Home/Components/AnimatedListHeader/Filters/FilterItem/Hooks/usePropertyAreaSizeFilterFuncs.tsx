import React from "react";

import {
  IPropertySizeFilter,
  usePropertyFiltersContext,
} from "@/src/Context/PropertyFiltersContext";
import { IDimensions, IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { PropertyTypesEnum } from "@/src/Utils/Constants";

const usePropertyAreaSizeFilterFuncs = (
  propertySize: IPropertySizeFilter,
  propertyType: IPropertyType,
  setPropertySize: React.Dispatch<React.SetStateAction<IPropertySizeFilter>>
) => {
  const { propertySizeFilter, setPropertySizeFilter } =
    usePropertyFiltersContext();
  const size = () => {
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      return propertySize.commercialForsale.figure;
    } else if (propertyType === PropertyTypesEnum.CommercialRentals) {
      return propertySize.commercialRentals.figure;
    } else if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      return propertySize.residentialForsale.figure;
    } else if (propertyType === PropertyTypesEnum.ResidentialRentals) {
      return propertySize.residentialRentals.figure;
    } else if (propertyType === PropertyTypesEnum.Stands) {
      return propertySize.stand.figure;
    } else {
      return propertySize.land.figure;
    }
  };
  const handleSelectSize = (size: string) => {
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      setPropertySize({
        ...propertySize,
        commercialForsale: { ...propertySize.commercialForsale, figure: size },
      });
    } else if (propertyType === PropertyTypesEnum.CommercialRentals) {
      setPropertySize({
        ...propertySize,
        commercialRentals: { ...propertySize.commercialRentals, figure: size },
      });
    } else if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      setPropertySize({
        ...propertySize,
        residentialForsale: {
          ...propertySize.residentialForsale,
          figure: size,
        },
      });
    } else if (propertyType === PropertyTypesEnum.ResidentialRentals) {
      setPropertySize({
        ...propertySize,
        residentialRentals: {
          ...propertySize.residentialRentals,
          figure: size,
        },
      });
    } else if (propertyType === PropertyTypesEnum.Stands) {
      setPropertySize({
        ...propertySize,
        stand: { ...propertySize.stand, figure: size },
      });
    } else {
      setPropertySize({
        ...propertySize,
        land: { ...propertySize.land, figure: size },
      });
    }
  };

  const handleSelectDimensions = (dimemsions: IDimensions) => {
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      setPropertySize({
        ...propertySize,
        commercialForsale: {
          ...propertySize.commercialForsale,
          dimension: dimemsions,
        },
      });
    }
    if (propertyType === PropertyTypesEnum.CommercialRentals) {
      setPropertySize({
        ...propertySize,
        commercialRentals: {
          ...propertySize.commercialRentals,
          dimension: dimemsions,
        },
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      setPropertySize({
        ...propertySize,
        residentialForsale: {
          ...propertySize.residentialForsale,
          dimension: dimemsions,
        },
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialRentals) {
      setPropertySize({
        ...propertySize,
        residentialRentals: {
          ...propertySize.residentialRentals,
          dimension: dimemsions,
        },
      });
    }
    if (propertyType === PropertyTypesEnum.Stands) {
      setPropertySize({
        ...propertySize,
        stand: { ...propertySize.stand, dimension: dimemsions },
      });
    }
    if (propertyType === PropertyTypesEnum.Land) {
      setPropertySize({
        ...propertySize,
        land: { ...propertySize.land, dimension: dimemsions },
      });
    }
  };

  const color = (
    dimension: IDimensions,
    highlightedColor: string,
    unhighlightedColor: string
  ) => {
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      if (propertySize.commercialForsale.dimension === dimension)
        return highlightedColor;
      else return unhighlightedColor;
    } else if (propertyType === PropertyTypesEnum.CommercialRentals) {
      if (propertySize.commercialForsale.dimension === dimension)
        return highlightedColor;
      else return unhighlightedColor;
    } else if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      if (propertySize.residentialForsale.dimension === dimension)
        return highlightedColor;
      else return unhighlightedColor;
    } else if (propertyType === PropertyTypesEnum.Stands) {
      if (propertySize.stand.dimension === dimension) return highlightedColor;
      else return unhighlightedColor;
    } else if (propertyType === PropertyTypesEnum.Land) {
      if (propertySize.land.dimension === dimension) return highlightedColor;
      else return unhighlightedColor;
    } else {
      if (propertySize.residentialRentals.dimension === dimension)
        return highlightedColor;
      else return unhighlightedColor;
    }
  };

  const applyPropertySizeFilter = () => {
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      setPropertySizeFilter({
        ...propertySizeFilter,
        commercialForsale: propertySize.commercialForsale,
      });
    }
    if (propertyType === PropertyTypesEnum.CommercialRentals) {
      setPropertySizeFilter({
        ...propertySizeFilter,
        commercialRentals: propertySize.commercialRentals,
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      setPropertySizeFilter({
        ...propertySizeFilter,
        residentialForsale: propertySize.residentialForsale,
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialRentals) {
      setPropertySizeFilter({
        ...propertySizeFilter,
        residentialRentals: propertySize.residentialRentals,
      });
    }
    if (propertyType === PropertyTypesEnum.Stands) {
      setPropertySizeFilter({
        ...propertySizeFilter,
        stand: propertySize.stand,
      });
    }
    if (propertyType === PropertyTypesEnum.Land) {
      setPropertySizeFilter({
        ...propertySizeFilter,
        land: propertySize.land,
      });
    }
  };

  const resetPropertySizeFilter = () => {
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      setPropertySizeFilter({
        ...propertySizeFilter,
        commercialForsale: {
          figure: "",
          dimension: "m²",
        },
      });
      setPropertySize({
        ...propertySize,
        commercialForsale: {
          figure: "",
          dimension: "m²",
        },
      });
    }
    if (propertyType === PropertyTypesEnum.CommercialRentals) {
      setPropertySizeFilter({
        ...propertySizeFilter,
        commercialRentals: {
          figure: "",
          dimension: "m²",
        },
      });
      setPropertySize({
        ...propertySize,
        commercialRentals: {
          figure: "",
          dimension: "m²",
        },
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      setPropertySizeFilter({
        ...propertySizeFilter,
        residentialForsale: {
          figure: "",
          dimension: "m²",
        },
      });
      setPropertySize({
        ...propertySize,
        residentialForsale: {
          figure: "",
          dimension: "m²",
        },
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialRentals) {
      setPropertySizeFilter({
        ...propertySizeFilter,
        residentialRentals: {
          figure: "",
          dimension: "m²",
        },
      });
      setPropertySize({
        ...propertySize,
        residentialRentals: {
          figure: "",
          dimension: "m²",
        },
      });
    }
    if (propertyType === PropertyTypesEnum.Stands) {
      setPropertySizeFilter({
        ...propertySizeFilter,
        stand: {
          figure: "",
          dimension: "m²",
        },
      });
      setPropertySize({
        ...propertySize,
        stand: {
          figure: "",
          dimension: "m²",
        },
      });
    }
    if (propertyType === PropertyTypesEnum.Land) {
      setPropertySizeFilter({
        ...propertySizeFilter,
        land: {
          figure: "",
          dimension: "m²",
        },
      });
      setPropertySize({
        ...propertySize,
        land: {
          figure: "",
          dimension: "m²",
        },
      });
    }
  };
  return {
    size,
    color,
    handleSelectDimensions,
    handleSelectSize,
    applyPropertySizeFilter,
    resetPropertySizeFilter,
  };
};

export default usePropertyAreaSizeFilterFuncs;
