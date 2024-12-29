import { Modal, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";

import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { useAppDispatch, useAppSelector } from "@/src/Redux/Hooks/Config";
import { dark, pureWhite } from "@/src/Theme/Colors";
import PropertyTypesFilterList from "./Components/PropertyTypesFilterList";
import TopBar from "./Components/TopBar";
import BottomBar from "./Components/BottomBar";
import RentFilter from "./Components/RentFilter";
import {
  IBathroomsFilter,
  IBedroomsFilter,
  ICurrencyFilter,
  IPriceFilter,
  IPropertySizeFilter,
  IPropertyStructureTypeFilter,
  IRentFilter,
  IRoomsToRentFilter,
  ITotalRoomsFilter,
  usePropertyFiltersContext,
} from "@/src/Context/PropertyFiltersContext";
import PriceFilter from "./Components/PriceFilter";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import Currency from "./Components/Currency";
import SharedRooms from "./Components/SharedRooms";
import AreaSize from "./Components/AreaSize";
import PropertyStructureType from "./Components/PropertyStructureType";
import { setActivePropertyType } from "@/src/Redux/Slices/ActivePropertyTypeSlice/ActiveProperty";
import usePropertyStructureFilterFuncs from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/FilterItem/Hooks/usePropertyStructureFilterFuncs";
import useCurrencyFilterFuncs from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/FilterItem/Hooks/useCurrencyFilterFuncs";
import useRentFilterFuncs from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/FilterItem/Hooks/useRentFilterFuncs";
import usePriceFilterFuncs from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/FilterItem/Hooks/usePriceFilterFuncs";
import usePropertyAreaSizeFilterFuncs from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/FilterItem/Hooks/usePropertyAreaSizeFilterFuncs";
import useSharedRoomsFilterFuncs from "@/src/Screens/Home/Components/AnimatedListHeader/Filters/FilterItem/Hooks/useSharedRoomsFilterFuncs";

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
  } = usePropertyFiltersContext();
  const activePropertyType = useAppSelector(
    (state) => state.activePropertyType.value
  );

  const [rentFilterLocalDetails, setRentFilterLocalDetails] =
    useState<IRentFilter>({
      residentialRentals: {
        max: rentFilter.residentialRentals.max,
        min: rentFilter.residentialRentals.min,
      },
      commercialRentals: {
        max: rentFilter.commercialRentals.max,
        min: rentFilter.commercialRentals.min,
      },
    });

  const [priceFilterLocalDetails, setPriceFilterLocalDetails] =
    useState<IPriceFilter>({
      residentialForSale: {
        max: priceFilter.residentialForSale.max,
        min: priceFilter.residentialForSale.min,
      },
      commercialForSale: {
        max: priceFilter.commercialForSale.max,
        min: priceFilter.commercialForSale.min,
      },
      stand: {
        max: priceFilter.stand.max,
        min: priceFilter.stand.min,
      },
      land: {
        max: priceFilter.land.max,
        min: priceFilter.land.min,
      },
    });

  const [selectedTotalNumberOfRooms, setSelectedTotalNumberOfRooms] =
    useState<ITotalRoomsFilter>({
      residentialForsaleFigure: totalRoomsFilter.residentialForsaleFigure,
      residentialRentalsFigure: totalRoomsFilter.residentialRentalsFigure,
      commercialForsaleFigure: totalRoomsFilter.commercialForsaleFigure,
      commercialRentalsFigure: totalRoomsFilter.commercialRentalsFigure,
    });

  const [selectedNumberOfRoomsToRent, setSelectedNumberOfRoomsToRent] =
    useState<IRoomsToRentFilter>({
      commercialRentalsFigure: roomsToRentFilter.commercialRentalsFigure,
      residentialRentalsFigure: roomsToRentFilter.residentialRentalsFigure,
    });

  const [selectedNumberOfBathrooms, setSelectedNumberOfBathrooms] =
    useState<IBathroomsFilter>({
      residentialForsaleFigure: bathroomsFilter.residentialForsaleFigure,
      residentialRentalsFigure: bathroomsFilter.residentialRentalsFigure,
    });

  const [selectedNumberOfBedrooms, setSelectedNumberOfBedrooms] =
    useState<IBedroomsFilter>({
      residentialForsaleFigure: bedroomsFilter.residentialForsaleFigure,
      residentialRentalsFigure: bedroomsFilter.residentialRentalsFigure,
    });

  const [propertySize, setPropertySize] = useState<IPropertySizeFilter>({
    residentialForsale: {
      figure: propertySizeFilter.residentialForsale.figure,
      dimension: propertySizeFilter.residentialForsale.dimension,
    },
    residentialRentals: {
      figure: propertySizeFilter.residentialRentals.figure,
      dimension: propertySizeFilter.residentialRentals.dimension,
    },
    commercialForsale: {
      figure: propertySizeFilter.commercialForsale.figure,
      dimension: propertySizeFilter.commercialForsale.dimension,
    },
    commercialRentals: {
      figure: propertySizeFilter.commercialRentals.figure,
      dimension: propertySizeFilter.commercialRentals.dimension,
    },
    stand: {
      figure: propertySizeFilter.stand.figure,
      dimension: propertySizeFilter.stand.dimension,
    },
    land: {
      figure: propertySizeFilter.land.figure,
      dimension: propertySizeFilter.land.dimension,
    },
  });

  const [currency, setCurrency] = useState<ICurrencyFilter>({
    commercialForsale: currencyFilter.commercialForsale,
    commercialRentals: currencyFilter.commercialRentals,
    residentialForsale: currencyFilter.residentialForsale,
    residentialRentals: currencyFilter.residentialRentals,
    stand: currencyFilter.stand,
    land: currencyFilter.land,
  });

  const [propertyStructureType, setPropertyStructureType] =
    useState<IPropertyStructureTypeFilter>({
      commercialForsale: propertyStructureTypeFilter.commercialForsale,
      commercialRentals: propertyStructureTypeFilter.commercialRentals,
      residentialForsale: propertyStructureTypeFilter.residentialForsale,
      residentialRentals: propertyStructureTypeFilter.residentialRentals,
      stand: propertyStructureTypeFilter.stand,
      land: propertyStructureTypeFilter.land,
    });

  const [propertyType, setPropertyType] =
    useState<IPropertyType>(activePropertyType);

  const theme = useAppSelector((state) => state.theme.value);
  const dispatch = useAppDispatch();

  const { resetPropertyStructureTypeFilter, applyPropertyStructureTypeFilter } =
    usePropertyStructureFilterFuncs(
      propertyStructureType,
      propertyType,
      setPropertyStructureType
    );

  const { applyCurrencyFilter, resetCurrencyFilter } = useCurrencyFilterFuncs(
    currency,
    propertyType,
    setCurrency
  );

  const { applyPropertySizeFilter, resetPropertySizeFilter } =
    usePropertyAreaSizeFilterFuncs(propertySize, propertyType, setPropertySize);

  const { applyRentFilter, resetRentFilter } = useRentFilterFuncs(
    rentFilterLocalDetails,
    propertyType,
    setRentFilterLocalDetails
  );

  const { applyPriceFilter, resetPriceFilter } = usePriceFilterFuncs(
    priceFilterLocalDetails,
    propertyType,
    setPriceFilterLocalDetails
  );

  const { resetSharedRoomsFilter, applySharedRoomsFilter } =
    useSharedRoomsFilterFuncs(
      propertyType,
      selectedTotalNumberOfRooms,
      selectedNumberOfRoomsToRent,
      selectedNumberOfBathrooms,
      selectedNumberOfBedrooms,
      setSelectedNumberOfBathrooms,
      setSelectedNumberOfBedrooms,
      setSelectedNumberOfRoomsToRent,
      setSelectedTotalNumberOfRooms
    );

  const handleApplyFilters = () => {
    applyPropertySizeFilter();
    applyPriceFilter();
    applyRentFilter();
    applySharedRoomsFilter();
    applyCurrencyFilter();
    applyPropertyStructureTypeFilter();
    dispatch(setActivePropertyType(propertyType));
    closeModal();
  };

  const handleResetFilters = () => {
    resetPropertySizeFilter();
    resetPriceFilter();
    resetRentFilter();
    resetCurrencyFilter();
    resetPropertyStructureTypeFilter();
    resetSharedRoomsFilter();
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
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View style={styles.contentContainer}>
              <PropertyTypesFilterList
                setPropertyType={setPropertyType}
                propertyType={propertyType}
              />
              <Currency
                setCurrency={setCurrency}
                currency={currency}
                propertyType={propertyType}
              />
              {propertyType === PropertyTypesEnum.CommercialRentals ||
              propertyType === PropertyTypesEnum.ResidentialRentals ? (
                <RentFilter
                  rentFilterLocalDetails={rentFilterLocalDetails}
                  setRentFilterLocalDetails={setRentFilterLocalDetails}
                  propertyType={propertyType}
                />
              ) : (
                <PriceFilter
                  price={priceFilterLocalDetails}
                  setPrice={setPriceFilterLocalDetails}
                  propertyType={propertyType}
                />
              )}
              {(propertyType === PropertyTypesEnum.CommercialRentals ||
                propertyType === PropertyTypesEnum.ResidentialRentals) && (
                <SharedRooms
                  propertyType={propertyType}
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
                    propertyType={propertyType}
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
                  propertyType={propertyType}
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
                  propertyType={propertyType}
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
                propertyType={propertyType}
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
    marginTop: 10,
  },
  contentSubContainer: {
    paddingHorizontal: 10,
  },
});
