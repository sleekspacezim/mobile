import React from "react";

import {
  ITotalRoomsFilter,
  IRoomsToRentFilter,
  IBathroomsFilter,
  IBedroomsFilter,
  usePropertyFiltersContext,
} from "@/src/Context/PropertyFiltersContext";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { PropertyTypesEnum } from "@/src/Utils/Constants";

const useSharedRoomsFilterFuncs = (
  propertyType: IPropertyType,
  selectedTotalNumberOfRooms: ITotalRoomsFilter,
  selectedNumberOfRoomsToRent: IRoomsToRentFilter,
  selectedNumberOfBathrooms: IBathroomsFilter,
  selectedNumberOfBedrooms: IBedroomsFilter,
  setSelectedNumberOfBathrooms: React.Dispatch<
    React.SetStateAction<IBathroomsFilter>
  >,
  setSelectedNumberOfBedrooms: React.Dispatch<
    React.SetStateAction<IBedroomsFilter>
  >,
  setSelectedNumberOfRoomsToRent: React.Dispatch<
    React.SetStateAction<IRoomsToRentFilter>
  >,
  setSelectedTotalNumberOfRooms: React.Dispatch<
    React.SetStateAction<ITotalRoomsFilter>
  >
) => {
  const {
    totalRoomsFilter,
    bathroomsFilter,
    bedroomsFilter,
    roomsToRentFilter,
    setBathroomsFilter,
    setBedroomsFilter,
    setTotalRoomsFilter,
    setRoomsToRentFilter,
  } = usePropertyFiltersContext();

  const totalRoomsColor = (
    numberOfRooms: string,
    highlightedColor: string,
    unhighlightedColor: string
  ) => {
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      if (selectedTotalNumberOfRooms.commercialForsaleFigure === numberOfRooms)
        return highlightedColor;
      else return unhighlightedColor;
    } if (propertyType === PropertyTypesEnum.CommercialRentals) {
      if (selectedTotalNumberOfRooms.commercialRentalsFigure === numberOfRooms)
        return highlightedColor;
      else return unhighlightedColor;
    } if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      if (selectedTotalNumberOfRooms.residentialForsaleFigure === numberOfRooms)
        return highlightedColor;
      else return unhighlightedColor;
    } if(propertyType === PropertyTypesEnum.ResidentialRentals) {
      if (selectedTotalNumberOfRooms.residentialRentalsFigure === numberOfRooms)
        return highlightedColor;
      else return unhighlightedColor;
    }
  };

  const roomsToRentColor = (
    numberOfRooms: string,
    highlightedColor: string,
    unhighlightedColor: string
  ) => {
    if (propertyType === PropertyTypesEnum.CommercialRentals) {
      if (selectedNumberOfRoomsToRent.commercialRentalsFigure === numberOfRooms)
        return highlightedColor;
      else return unhighlightedColor;
    } else {
      if (
        selectedNumberOfRoomsToRent.residentialRentalsFigure === numberOfRooms
      )
        return highlightedColor;
      else return unhighlightedColor;
    }
  };

  const bathRoomsColor = (
    numberOfRooms: string,
    highlightedColor: string,
    unhighlightedColor: string
  ) => {
    if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      if (selectedNumberOfBathrooms.residentialForsaleFigure === numberOfRooms)
        return highlightedColor;
      else return unhighlightedColor;
    } else {
      if (selectedNumberOfBathrooms.residentialRentalsFigure === numberOfRooms)
        return highlightedColor;
      else return unhighlightedColor;
    }
  };

  const bedRoomsColor = (
    numberOfRooms: string,
    highlightedColor: string,
    unhighlightedColor: string
  ) => {
    if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      if (selectedNumberOfBedrooms.residentialForsaleFigure === numberOfRooms)
        return highlightedColor;
      else return unhighlightedColor;
    } else {
      if (selectedNumberOfBedrooms.residentialRentalsFigure === numberOfRooms)
        return highlightedColor;
      else return unhighlightedColor;
    }
  };

  const handleSelectTotalRooms = (numberOfRooms: string) => {
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      setSelectedTotalNumberOfRooms({
        ...selectedTotalNumberOfRooms,
        commercialForsaleFigure: numberOfRooms,
      });
    }
    if (propertyType === PropertyTypesEnum.CommercialRentals) {
      setSelectedTotalNumberOfRooms({
        ...selectedTotalNumberOfRooms,
        commercialRentalsFigure: numberOfRooms,
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      setSelectedTotalNumberOfRooms({
        ...selectedTotalNumberOfRooms,
        residentialForsaleFigure: numberOfRooms,
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialRentals) {
      setSelectedTotalNumberOfRooms({
        ...selectedTotalNumberOfRooms,
        residentialRentalsFigure: numberOfRooms,
      });
    }
  };

  const handleSelectRoomsToRent = (numberOfRooms: string) => {
    if (propertyType === PropertyTypesEnum.CommercialRentals) {
      setSelectedNumberOfRoomsToRent({
        ...selectedNumberOfRoomsToRent,
        commercialRentalsFigure: numberOfRooms,
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialRentals) {
      setSelectedNumberOfRoomsToRent({
        ...selectedNumberOfRoomsToRent,
        residentialRentalsFigure: numberOfRooms,
      });
    }
  };

  const handleSelectBathrooms = (numberOfRooms: string) => {
    if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      setSelectedNumberOfBathrooms({
        ...selectedNumberOfBathrooms,
        residentialForsaleFigure: numberOfRooms,
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialRentals) {
      setSelectedNumberOfBathrooms({
        ...selectedNumberOfBathrooms,
        residentialRentalsFigure: numberOfRooms,
      });
    }
  };

  const handleSelectBedrooms = (numberOfRooms: string) => {
    if (propertyType === PropertyTypesEnum.ResidentialForSale)
      setSelectedNumberOfBedrooms({
        ...selectedNumberOfBedrooms,
        residentialForsaleFigure: numberOfRooms,
      });
    if (propertyType === PropertyTypesEnum.ResidentialRentals)
      setSelectedNumberOfBedrooms({
        ...selectedNumberOfBedrooms,
        residentialRentalsFigure: numberOfRooms,
      });
  };

  const applySharedRoomsFilter = () => {
    if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      setBathroomsFilter({
        ...bathroomsFilter,
        residentialForsaleFigure:
          selectedNumberOfBathrooms.residentialForsaleFigure,
      });
      setTotalRoomsFilter({
        ...totalRoomsFilter,
        residentialForsaleFigure:
          selectedTotalNumberOfRooms.residentialForsaleFigure,
      });
      setBedroomsFilter({
        ...bedroomsFilter,
        residentialForsaleFigure:
          selectedNumberOfBedrooms.residentialForsaleFigure,
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialRentals) {
      setBathroomsFilter({
        ...bathroomsFilter,
        residentialRentalsFigure:
          selectedNumberOfBathrooms.residentialRentalsFigure,
      });
      setTotalRoomsFilter({
        ...totalRoomsFilter,
        residentialRentalsFigure:
          selectedTotalNumberOfRooms.residentialRentalsFigure,
      });
      setBedroomsFilter({
        ...bedroomsFilter,
        residentialRentalsFigure:
          selectedNumberOfBedrooms.residentialRentalsFigure,
      });
      setRoomsToRentFilter({
        ...roomsToRentFilter,
        residentialRentalsFigure:
          selectedNumberOfRoomsToRent.residentialRentalsFigure,
      });
    }
    if (propertyType === PropertyTypesEnum.CommercialRentals) {
      setRoomsToRentFilter({
        ...roomsToRentFilter,
        commercialRentalsFigure:
          selectedNumberOfRoomsToRent.commercialRentalsFigure,
      });
      setTotalRoomsFilter({
        ...totalRoomsFilter,
        commercialRentalsFigure:
          selectedTotalNumberOfRooms.commercialRentalsFigure,
      });
    }
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      setTotalRoomsFilter({
        ...totalRoomsFilter,
        commercialForsaleFigure:
          selectedTotalNumberOfRooms.commercialForsaleFigure,
      });
    }
  };

  const resetSharedRoomsFilter = () => {
    if (propertyType === PropertyTypesEnum.ResidentialForSale) {
      setBathroomsFilter({
        ...bathroomsFilter,
        residentialForsaleFigure: "",
      });
      setSelectedNumberOfBathrooms({
        ...selectedNumberOfBathrooms,
        residentialForsaleFigure: "",
      });
      setTotalRoomsFilter({
        ...totalRoomsFilter,
        residentialForsaleFigure: "",
      });
      setSelectedTotalNumberOfRooms({
        ...selectedTotalNumberOfRooms,
        residentialForsaleFigure: "",
      });
      setBedroomsFilter({
        ...bedroomsFilter,
        residentialForsaleFigure: "",
      });
      setSelectedNumberOfBedrooms({
        ...selectedNumberOfBedrooms,
        residentialForsaleFigure: "",
      });
    }
    if (propertyType === PropertyTypesEnum.ResidentialRentals) {
      setBathroomsFilter({
        ...bathroomsFilter,
        residentialRentalsFigure: "",
      });
      setSelectedNumberOfBathrooms({
        ...selectedNumberOfBathrooms,
        residentialRentalsFigure: "",
      });
      setTotalRoomsFilter({
        ...totalRoomsFilter,
        residentialRentalsFigure: "",
      });
      setSelectedTotalNumberOfRooms({
        ...selectedTotalNumberOfRooms,
        residentialRentalsFigure: "",
      });
      setBedroomsFilter({
        ...bedroomsFilter,
        residentialRentalsFigure: "",
      });
      setSelectedNumberOfBedrooms({
        ...selectedNumberOfBedrooms,
        residentialRentalsFigure: "",
      });
      setRoomsToRentFilter({
        ...roomsToRentFilter,
        residentialRentalsFigure: "",
      });
      setSelectedNumberOfRoomsToRent({
        ...selectedNumberOfRoomsToRent,
        residentialRentalsFigure: "",
      });
    }
    if (propertyType === PropertyTypesEnum.CommercialRentals) {
      setRoomsToRentFilter({
        ...roomsToRentFilter,
        commercialRentalsFigure: "",
      });
      setTotalRoomsFilter({
        ...totalRoomsFilter,
        commercialRentalsFigure: "",
      });
      setSelectedNumberOfRoomsToRent({
        ...selectedNumberOfRoomsToRent,
        commercialRentalsFigure: "",
      });
      setSelectedTotalNumberOfRooms({
        ...selectedTotalNumberOfRooms,
        commercialRentalsFigure: "",
      });
    }
    if (propertyType === PropertyTypesEnum.CommercialForSale) {
      setTotalRoomsFilter({
        ...totalRoomsFilter,
        commercialForsaleFigure: "",
      });
      setSelectedTotalNumberOfRooms({
        ...selectedTotalNumberOfRooms,
        commercialForsaleFigure: "",
      });
    }
  };
  return {
    handleSelectBathrooms,
    handleSelectBedrooms,
    handleSelectRoomsToRent,
    handleSelectTotalRooms,
    totalRoomsColor,
    bathRoomsColor,
    bedRoomsColor,
    roomsToRentColor,
    resetSharedRoomsFilter,
    applySharedRoomsFilter,
  };
};

export default useSharedRoomsFilterFuncs;
