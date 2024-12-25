import {
  Modal,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";

import { ICurrency, IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { IPropertySize, IVoidFunc } from "@/src/GlobalTypes/Types";
import { useAppDispatch, useAppSelector } from "@/src/Redux/Hooks/Config";
import { dark, pureWhite } from "@/src/Theme/Colors";
import PropertyTypesFilterList from "./Components/PropertyTypesFilterList";
import TopBar from "./Components/TopBar";
import BottomBar from "./Components/BottomBar";
import RentFilter from "./Components/RentFilter";
import { usePropertyFiltersContext } from "@/src/Context/PropertyFiltersContext";
import PriceFilter from "./Components/PriceFilter";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import Currency from "./Components/Currency";
import SharedRooms from "./Components/SharedRooms";
import AreaSize from "./Components/AreaSize";
import PropertyStructureType from "./Components/PropertyStructureType";
import { setActivePropertyType } from "@/src/Redux/Slices/ActivePropertyTypeSlice/ActiveProperty";

type Props = {
  isFilterModalOpen: boolean;
  closeModal: IVoidFunc;
};

const AllFiltersModal: React.FC<Props> = ({
  isFilterModalOpen,
  closeModal,
}) => {
  const {
    propertyStructureTypeFilter,
    totalRoomsFilter,
    bathroomsFilter,
    bedroomsFilter,
    roomsToRentFilter,
    propertySizeFilter,
    currencyFilter,
    priceFilter,
    rentFilter,
    setPriceFilter,
    setRentFilter,
    setCurrencyFilter,
    setPropertySizeFilter,
    setBathroomsFilter,
    setBedroomsFilter,
    setRoomsToRentFilter,
    setTotalRoomsFilter,
    setPropertyStructureTypeFilter,
  } = usePropertyFiltersContext();
  const activePropertyType = useAppSelector(
    (state) => state.activePropertyType.value
  );
  const [rentMin, setRentMin] = useState<number>(rentFilter.min);
  const [rentMax, setRentMax] = useState<number>(rentFilter.max);
  const [priceMin, setPriceMin] = useState<number>(priceFilter.min);
  const [priceMax, setPriceMax] = useState<number>(priceFilter.max);
  const [selectedTotalNumberOfRooms, setSelectedTotalNumberOfRooms] =
    useState<string>(totalRoomsFilter.figure);
  const [selectedNumberOfRoomsToRent, setSelectedNumberOfRoomsToRent] =
    useState<string>(roomsToRentFilter.figure);
  const [selectedNumberOfBathrooms, setSelectedNumberOfBathrooms] =
    useState<string>(bathroomsFilter.figure);
  const [selectedNumberOfBedrooms, setSelectedNumberOfBedrooms] =
    useState<string>(bedroomsFilter.figure);
  const [propertySize, setPropertySize] = useState<IPropertySize>({
    figure: propertySizeFilter.figure,
    dimension: propertySizeFilter.dimension,
  });
  const [currency, setCurrency] = useState<ICurrency | "">(
    currencyFilter.currency
  );
  const [propertyStructureType, setPropertyStructureType] = useState<string>(
    propertyStructureTypeFilter.type
  );
  const [propertyType, setPropertyType] =
    useState<IPropertyType>(activePropertyType);
  const theme = useAppSelector((state) => state.theme.value);
  const dispatch = useAppDispatch()

  const handleApplyFilters = () => {
    if (propertySize.figure) {
      setPropertySizeFilter({
        isActive: true,
        figure: propertySize.figure,
        dimension: propertySize.dimension,
        propertyType,
      });
    } else {
      setPropertySizeFilter({
        isActive: false,
        figure: "",
        dimension: "m²",
        propertyType: "",
      });
    }
    if (priceMin <= priceMax) {
      if (priceMax > 0 || priceMin > 0) {
        setPriceFilter({
          isActive: true,
          max: priceMax,
          min: priceMin,
          propertyType: propertyType as
            | PropertyTypesEnum.CommercialForSale
            | PropertyTypesEnum.ResidentialForSale
            | PropertyTypesEnum.Stands
            | PropertyTypesEnum.Land
            | "",
        });
      }
    }
    if (rentMin <= rentMax) {
      if (rentMax > 0 || rentMin > 0) {
        setRentFilter({
          isActive: true,
          max: rentMax,
          min: rentMin,
          propertyType: propertyType as
            | PropertyTypesEnum.CommercialRentals
            | PropertyTypesEnum.ResidentialRentals
            | "",
        });
      }
    }
    if (selectedNumberOfRoomsToRent) {
      setRoomsToRentFilter({
        isActive: true,
        figure: selectedNumberOfRoomsToRent,
        propertyType: activePropertyType as
          | ""
          | PropertyTypesEnum.ResidentialRentals
          | PropertyTypesEnum.CommercialRentals,
      });
    }
    if (selectedNumberOfBathrooms) {
      setBathroomsFilter({
        isActive: true,
        figure: selectedNumberOfBathrooms,
        propertyType: activePropertyType as
          | ""
          | PropertyTypesEnum.ResidentialForSale
          | PropertyTypesEnum.ResidentialRentals,
      });
    }
    if (selectedNumberOfBedrooms) {
      setBedroomsFilter({
        isActive: true,
        figure: selectedNumberOfBedrooms,
        propertyType: activePropertyType as
          | ""
          | PropertyTypesEnum.ResidentialForSale
          | PropertyTypesEnum.ResidentialRentals,
      });
    }
    if (selectedTotalNumberOfRooms) {
      setTotalRoomsFilter({
        isActive: true,
        figure: selectedTotalNumberOfRooms,
        propertyType: activePropertyType as
          | ""
          | PropertyTypesEnum.ResidentialRentals
          | PropertyTypesEnum.ResidentialForSale
          | PropertyTypesEnum.CommercialRentals
          | PropertyTypesEnum.CommercialForSale,
      });
    }
    setCurrencyFilter({
      isActive: true,
      currency,
      propertyType: activePropertyType,
    });
    setPropertyStructureTypeFilter({
      isActive: true,
      type: propertyStructureType,
      propertyType: activePropertyType,
    });
    dispatch(setActivePropertyType(propertyType))
    closeModal()
  };

  const handleResetFilters = () => {
    setPropertySize({
      figure: "",
      dimension: "m²",
    });
    setPropertySizeFilter({
      isActive: false,
      figure: "",
      dimension: "m²",
      propertyType: "",
    });
    setPriceMax(0);
    setPriceMin(0);
    setPriceFilter({
      isActive: false,
      max: 0,
      min: 0,
      propertyType: "",
    });
    setRentMax(0);
    setRentMin(0);
    setRentFilter({
      isActive: false,
      max: 0,
      min: 0,
      propertyType: "",
    });
    setCurrency("");
    setCurrencyFilter({
      isActive: false,
      currency: "",
      propertyType: "",
    });
    setPropertyStructureType("");
    setPropertyStructureTypeFilter({
      isActive: false,
      type: "",
      propertyType: "",
    });
    setSelectedNumberOfRoomsToRent("");
    setRoomsToRentFilter({
      isActive: false,
      figure: "",
      propertyType: "",
    });
    setSelectedNumberOfBathrooms("");
    setBathroomsFilter({
      isActive: false,
      figure: "",
      propertyType: "",
    });
    setSelectedNumberOfBedrooms("");
    setBedroomsFilter({
      isActive: false,
      figure: "",
      propertyType: "",
    });
    setSelectedTotalNumberOfRooms("");
    setTotalRoomsFilter({
      isActive: false,
      figure: "",
      propertyType: "",
    });
    setPropertyType(PropertyTypesEnum.ResidentialRentals)
    dispatch(setActivePropertyType(PropertyTypesEnum.ResidentialRentals))
  };

  return (
    <Modal
      visible={isFilterModalOpen}
      onRequestClose={closeModal}
      animationType="fade"
    >
      <View
        style={[
          styles.container,
          { backgroundColor: theme === "dark" ? dark.background : pureWhite },
        ]}
      >
        <TopBar closeModal={closeModal} />
        <View style={{ flex: 1 }}>
          <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={styles.contentContainer}>
              <PropertyTypesFilterList
                setPropertyType={setPropertyType}
                propertyType={propertyType}
              />
              <Currency setCurrency={setCurrency} currency={currency} />
              {propertyType === PropertyTypesEnum.CommercialRentals ||
              propertyType === PropertyTypesEnum.ResidentialRentals ? (
                <RentFilter
                  rentMax={rentMax}
                  rentMin={rentMin}
                  setRentMax={setRentMax}
                  setRentMin={setRentMin}
                />
              ) : (
                <PriceFilter
                  priceMax={priceMax}
                  priceMin={priceMin}
                  setPriceMax={setPriceMax}
                  setPriceMin={setPriceMin}
                />
              )}
              {(propertyType === PropertyTypesEnum.CommercialRentals ||
                propertyType === PropertyTypesEnum.ResidentialRentals) && (
                <SharedRooms
                  filterType="Rooms to rent"
                  selectedNumberOfBathrooms={selectedNumberOfBathrooms}
                  selectedNumberOfBedrooms={selectedNumberOfBedrooms}
                  selectedNumberOfRoomsToRent={selectedNumberOfRoomsToRent}
                  selectedTotalNumberOfRooms={selectedTotalNumberOfRooms}
                  setSelectedNumberOfBathrooms={setSelectedNumberOfBathrooms}
                  setSelectedNumberOfBedrooms={setSelectedNumberOfBedrooms}
                  setSelectedNumberOfRoomsToRent={
                    setSelectedNumberOfRoomsToRent
                  }
                  setSelectedTotalNumberOfRooms={setSelectedTotalNumberOfRooms}
                />
              )}
              {propertyType !== PropertyTypesEnum.Land &&
                propertyType !== PropertyTypesEnum.Stands && (
                  <SharedRooms
                    filterType="Total rooms"
                    selectedNumberOfBathrooms={selectedNumberOfBathrooms}
                    selectedNumberOfBedrooms={selectedNumberOfBedrooms}
                    selectedNumberOfRoomsToRent={selectedNumberOfRoomsToRent}
                    selectedTotalNumberOfRooms={selectedTotalNumberOfRooms}
                    setSelectedNumberOfBathrooms={setSelectedNumberOfBathrooms}
                    setSelectedNumberOfBedrooms={setSelectedNumberOfBedrooms}
                    setSelectedNumberOfRoomsToRent={
                      setSelectedNumberOfRoomsToRent
                    }
                    setSelectedTotalNumberOfRooms={
                      setSelectedTotalNumberOfRooms
                    }
                  />
                )}
              {(propertyType === PropertyTypesEnum.ResidentialForSale ||
                propertyType === PropertyTypesEnum.ResidentialRentals) && (
                <SharedRooms
                  filterType="Bedrooms"
                  selectedNumberOfBathrooms={selectedNumberOfBathrooms}
                  selectedNumberOfBedrooms={selectedNumberOfBedrooms}
                  selectedNumberOfRoomsToRent={selectedNumberOfRoomsToRent}
                  selectedTotalNumberOfRooms={selectedTotalNumberOfRooms}
                  setSelectedNumberOfBathrooms={setSelectedNumberOfBathrooms}
                  setSelectedNumberOfBedrooms={setSelectedNumberOfBedrooms}
                  setSelectedNumberOfRoomsToRent={
                    setSelectedNumberOfRoomsToRent
                  }
                  setSelectedTotalNumberOfRooms={setSelectedTotalNumberOfRooms}
                />
              )}
              {(propertyType === PropertyTypesEnum.ResidentialForSale ||
                propertyType === PropertyTypesEnum.ResidentialRentals) && (
                <SharedRooms
                  filterType="Bathrooms"
                  selectedNumberOfBathrooms={selectedNumberOfBathrooms}
                  selectedNumberOfBedrooms={selectedNumberOfBedrooms}
                  selectedNumberOfRoomsToRent={selectedNumberOfRoomsToRent}
                  selectedTotalNumberOfRooms={selectedTotalNumberOfRooms}
                  setSelectedNumberOfBathrooms={setSelectedNumberOfBathrooms}
                  setSelectedNumberOfBedrooms={setSelectedNumberOfBedrooms}
                  setSelectedNumberOfRoomsToRent={
                    setSelectedNumberOfRoomsToRent
                  }
                  setSelectedTotalNumberOfRooms={setSelectedTotalNumberOfRooms}
                />
              )}
              <AreaSize
                propertySize={propertySize}
                setPropertySize={setPropertySize}
              />
              <PropertyStructureType
                propertyStructureType={propertyStructureType}
                propertyType={propertyType}
                setPropertyStructureType={setPropertyStructureType}
              />
            </View>
          </ScrollView>
        </View>
        <BottomBar
          applyFiltersFunc={handleApplyFilters}
          resetFiltersFunc={handleResetFilters}
        />
      </View>
    </Modal>
  );
};

export default AllFiltersModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: 10,
    marginTop: 10
  },
  contentSubContainer: {
    paddingHorizontal: 10,
  },
});
