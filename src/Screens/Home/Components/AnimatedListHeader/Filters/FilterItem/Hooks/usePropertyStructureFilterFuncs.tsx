import React from "react";

import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import {
  IPropertyStructureTypeFilter,
  usePropertyFiltersContext,
} from "@/src/Context/PropertyFiltersContext";
import { PropertyTypesEnum } from "@/src/Utils/Constants";

const usePropertyStructureFilterFuncs = (
  propertyStructureType: IPropertyStructureTypeFilter,
  propertyType: IPropertyType,
  setPropertyStructureType: React.Dispatch<
    React.SetStateAction<IPropertyStructureTypeFilter>
  >
) => {
  const { propertyStructureTypeFilter, setPropertyStructureTypeFilter } =
    usePropertyFiltersContext();

  const handleSelectStructure = (structure: string) => {
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      setPropertyStructureType({
        ...propertyStructureType,
        commercialForsale: structure,
      });
    }
    if (propertyType === PropertyTypesEnum.CommercialRentals) {
      setPropertyStructureType({
        ...propertyStructureType,
        commercialRentals: structure,
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      setPropertyStructureType({
        ...propertyStructureType,
        residentialForsale: structure,
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialRentals) {
      setPropertyStructureType({
        ...propertyStructureType,
        residentialRentals: structure,
      });
    }
    if (propertyType === PropertyTypesEnum.Stands) {
      setPropertyStructureType({
        ...propertyStructureType,
        stand: structure,
      });
    }
    if (propertyType === PropertyTypesEnum.Land) {
      setPropertyStructureType({
        ...propertyStructureType,
        land: structure,
      });
    }
  };

  const color = (
    structureOption: string,
    highlightedColor: string,
    unhighlightedColor: string
  ) => {
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      if (propertyStructureType.commercialForsale === structureOption)
        return highlightedColor;
      else return unhighlightedColor;
    } else if (propertyType === PropertyTypesEnum.CommercialRentals) {
      if (propertyStructureType.commercialForsale === structureOption)
        return highlightedColor;
      else return unhighlightedColor;
    } else if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      if (propertyStructureType.residentialForsale === structureOption)
        return highlightedColor;
      else return unhighlightedColor;
    } else if (propertyType === PropertyTypesEnum.Stands) {
      if (propertyStructureType.stand === structureOption)
        return highlightedColor;
      else return unhighlightedColor;
    } else if (propertyType === PropertyTypesEnum.Land) {
      if (propertyStructureType.land === structureOption)
        return highlightedColor;
      else return unhighlightedColor;
    } else {
      if (propertyStructureType.residentialRentals === structureOption)
        return highlightedColor;
      else return unhighlightedColor;
    }
  };

  const applyPropertyStructureTypeFilter = () => {
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      setPropertyStructureTypeFilter({
        ...propertyStructureTypeFilter,
        commercialForsale: propertyStructureType.commercialForsale,
      });
    }
    if (propertyType === PropertyTypesEnum.CommercialRentals) {
      setPropertyStructureTypeFilter({
        ...propertyStructureTypeFilter,
        commercialRentals: propertyStructureType.commercialRentals,
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      setPropertyStructureTypeFilter({
        ...propertyStructureTypeFilter,
        residentialForsale: propertyStructureType.residentialForsale,
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialRentals) {
      setPropertyStructureTypeFilter({
        ...propertyStructureTypeFilter,
        residentialRentals: propertyStructureType.residentialRentals,
      });
    }
    if (propertyType === PropertyTypesEnum.Land) {
      setPropertyStructureTypeFilter({
        ...propertyStructureTypeFilter,
        land: propertyStructureType.land,
      });
    }
    if (propertyType === PropertyTypesEnum.Stands) {
      setPropertyStructureTypeFilter({
        ...propertyStructureTypeFilter,
        stand: propertyStructureType.stand,
      });
    }
  };

  const resetPropertyStructureTypeFilter = () => {
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      setPropertyStructureTypeFilter({
        ...propertyStructureTypeFilter,
        commercialForsale: "",
      });
      setPropertyStructureType({
        ...propertyStructureTypeFilter,
        commercialForsale: "",
      });
    }
    if (propertyType === PropertyTypesEnum.CommercialRentals) {
      setPropertyStructureTypeFilter({
        ...propertyStructureTypeFilter,
        commercialRentals: "",
      });
      setPropertyStructureType({
        ...propertyStructureTypeFilter,
        commercialRentals: "",
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      setPropertyStructureTypeFilter({
        ...propertyStructureTypeFilter,
        residentialForsale: "",
      });
      setPropertyStructureType({
        ...propertyStructureTypeFilter,
        residentialForsale: "",
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialRentals) {
      setPropertyStructureTypeFilter({
        ...propertyStructureTypeFilter,
        residentialRentals: "",
      });
      setPropertyStructureType({
        ...propertyStructureTypeFilter,
        residentialRentals: "",
      });
    }
    if (propertyType === PropertyTypesEnum.Land) {
      setPropertyStructureTypeFilter({
        ...propertyStructureTypeFilter,
        land: "",
      });
      setPropertyStructureType({
        ...propertyStructureTypeFilter,
        land: "",
      });
    }
    if (propertyType === PropertyTypesEnum.Stands) {
      setPropertyStructureTypeFilter({
        ...propertyStructureTypeFilter,
        stand: "",
      });
      setPropertyStructureType({
        ...propertyStructureTypeFilter,
        stand: "",
      });
    }
  };

  return {
    handleSelectStructure,
    color,
    applyPropertyStructureTypeFilter,
    resetPropertyStructureTypeFilter,
  };
};

export default usePropertyStructureFilterFuncs;
