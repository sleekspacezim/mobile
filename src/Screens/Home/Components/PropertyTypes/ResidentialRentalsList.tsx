import { Animated, StyleSheet, useWindowDimensions, View } from "react-native";
import React, { useEffect, useState } from "react";

import { PropertyTypesEnum, SCREEN_BREAK_POINT } from "@/src/Utils/Constants";
import { getAllResidentialRentalPropertiesHttpFunc } from "@/src/HttpServices/Queries/Properties/PropertiesHttpFuncs";
import HttpError from "@/src/Components/HttpError/HttpError";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";
import EmptyPropertyList from "@/src/Components/EmptyPropertyList/EmptyPropertyList";
import ReportModal from "@/src/Components/Modals/Report/ReportModal";
import { useSharedContext } from "@/src/Context/SharedContext";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { usePropertiesContext } from "@/src/Context/PropertiesContext";
import { animatedHeaderHeight } from "../../Utils/Constants";
import { useSortPropertiesContext } from "@/src/Context/SortPropertiesContext";
import PropertiesListMobileView from "@/src/Screens/Home/Components/PropertyTypes/Components/PropertiesListMobileView";
import PropertiesListTableView from "./Components/PropertiesListTableView";
import { usePropertyFiltersContext } from "@/src/Context/PropertyFiltersContext";

type Props = {
  setTotalproperties: React.Dispatch<React.SetStateAction<number>>;
  scrollAnimation: Animated.Value;
};

const ResidentialRentalsList: React.FC<Props> = ({
  setTotalproperties,
  scrollAnimation,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [areMorePropertiesLoading, setAreMorePropertiesLoading] =
    useState<boolean>(false);
  const [loadMorehttpError, setloadMoreHttpError] = useState<string>("");
  const [httpError, setHttpError] = useState<string>("");
  const { sortResidentialRentalPropertiesBy } = useSortPropertiesContext();
  const { openReportModal, setOpenReportModal, selectedProperty } =
    useSharedContext();
  const { rentalResidentialProperties, setRentalResidentialProperties } =
    usePropertiesContext();
  const [numberOfpages, setNumberOfPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { width } = useWindowDimensions();
  const { accessToken } = useAppSelector((state) => state.user.value);
  const {
    rentFilter,
    currencyFilter,
    propertySizeFilter,
    propertyStructureTypeFilter,
    totalRoomsFilter,
    roomsToRentFilter,
    bathroomsFilter,
    bedroomsFilter,
  } = usePropertyFiltersContext();

  const pageLimit = width > SCREEN_BREAK_POINT ? 30 : 12;

  const fetchProperties = () => {
    getAllResidentialRentalPropertiesHttpFunc({
      page: 1,
      isUserLoggedIn: accessToken ? true : false,
      accessToken,
      pageLimit,
      sortBy: sortResidentialRentalPropertiesBy,
      rentMax: rentFilter.residentialRentals.max,
      rentMin: rentFilter.residentialRentals.min,
      currency: currencyFilter.residentialRentals,
      type: propertyStructureTypeFilter.residentialRentals,
      sizeDimension: propertySizeFilter.residentialRentals.dimension,
      sizeNumber: propertySizeFilter.residentialRentals.figure,
      bathroom: bathroomsFilter.residentialRentalsFigure,
      bedrooms: bedroomsFilter.residentialRentalsFigure,
      roomsToRent: roomsToRentFilter.residentialRentalsFigure,
      numberOfRooms: totalRoomsFilter.residentialRentalsFigure,
    })
      .then(({ data: { properties, totalPages, count } }) => {
        setRentalResidentialProperties(properties);
        setNumberOfPages(totalPages);
        setTotalproperties(count);
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
    getAllResidentialRentalPropertiesHttpFunc({
      page: 1,
      isUserLoggedIn: accessToken ? true : false,
      accessToken,
      pageLimit,
      sortBy: sortResidentialRentalPropertiesBy,
      rentMax: rentFilter.residentialRentals.max,
      rentMin: rentFilter.residentialRentals.min,
      currency: currencyFilter.residentialRentals,
      type: propertyStructureTypeFilter.residentialRentals,
      sizeDimension: propertySizeFilter.residentialRentals.dimension,
      sizeNumber: propertySizeFilter.residentialRentals.figure,
      bathroom: bathroomsFilter.residentialRentalsFigure,
      bedrooms: bedroomsFilter.residentialRentalsFigure,
      roomsToRent: roomsToRentFilter.residentialRentalsFigure,
      numberOfRooms: totalRoomsFilter.residentialRentalsFigure,
    })
      .then(({ data: { properties, totalPages, count } }) => {
        setRentalResidentialProperties(properties);
        setNumberOfPages(totalPages);
        setTotalproperties(count);
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
      getAllResidentialRentalPropertiesHttpFunc({
        page: pageNumber,
        isUserLoggedIn: accessToken ? true : false,
        accessToken,
        pageLimit,
        sortBy: sortResidentialRentalPropertiesBy,
        rentMax: rentFilter.residentialRentals.max,
        rentMin: rentFilter.residentialRentals.min,
        currency: currencyFilter.residentialRentals,
        type: propertyStructureTypeFilter.residentialRentals,
        sizeDimension: propertySizeFilter.residentialRentals.dimension,
        sizeNumber: propertySizeFilter.residentialRentals.figure,
        bathroom: bathroomsFilter.residentialRentalsFigure,
        bedrooms: bedroomsFilter.residentialRentalsFigure,
        roomsToRent: roomsToRentFilter.residentialRentalsFigure,
        numberOfRooms: totalRoomsFilter.residentialRentalsFigure,
      })
        .then(({ data: { properties, totalPages, count } }) => {
          setRentalResidentialProperties([
            ...rentalResidentialProperties,
            ...properties,
          ]);
          setNumberOfPages(totalPages);
          setTotalproperties(count);
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
  }, [
    accessToken,
    sortResidentialRentalPropertiesBy,
    rentFilter.residentialRentals,
    currencyFilter.residentialRentals,
    propertySizeFilter.residentialRentals,
    propertyStructureTypeFilter.residentialRentals,
    roomsToRentFilter.residentialRentalsFigure,
    totalRoomsFilter.residentialRentalsFigure,
    bathroomsFilter.residentialRentalsFigure,
    bedroomsFilter.residentialRentalsFigure,
  ]);

  useEffect(() => {
    if (httpError) setTotalproperties(0);
  }, [httpError]);

  const text =
    "We currently do not have Residential Rental Properties, please try again soon. Please checkout other property types in the meantime.";
  return (
    <View style={styles.container}>
      {isLoading && <LoadingSkeleton addAnimatedPaddingTop />}
      {httpError && (
        <View
          style={{
            flex: 1,
            paddingTop: width > SCREEN_BREAK_POINT ? 0 : animatedHeaderHeight,
          }}
        >
          <HttpError
            retryFunc={() => {
              setHttpError("");
              setIsLoading(true);
              fetchProperties();
            }}
          />
        </View>
      )}
      {!httpError && !isLoading && rentalResidentialProperties.length < 1 && (
        <View
          style={{
            flex: 1,
            paddingTop: width > SCREEN_BREAK_POINT ? 0 : animatedHeaderHeight,
          }}
        >
          <EmptyPropertyList text={text} />
        </View>
      )}
      {!httpError &&
        !isLoading &&
        rentalResidentialProperties.length > 0 &&
        width <= SCREEN_BREAK_POINT && (
          <PropertiesListMobileView
            propertyType={PropertyTypesEnum.ResidentialRentals}
            loadMorehttpError={loadMorehttpError}
            pageNumber={pageNumber}
            numberOfpages={numberOfpages}
            isRefreshing={isRefreshing}
            scrollAnimation={scrollAnimation}
            loadMoreProperties={loadMoreProperties}
            handleRefresh={handleRefresh}
          />
        )}
      {!httpError &&
        !isLoading &&
        rentalResidentialProperties.length > 0 &&
        width > SCREEN_BREAK_POINT && (
          <PropertiesListTableView
            propertyType={PropertyTypesEnum.ResidentialRentals}
            loadMorehttpError={loadMorehttpError}
            pageNumber={pageNumber}
            numberOfpages={numberOfpages}
            areMorePropertiesLoading={areMorePropertiesLoading}
            isRefreshing={isRefreshing}
            loadMoreProperties={loadMoreProperties}
            handleRefresh={handleRefresh}
            setAreMorePropertiesLoading={setAreMorePropertiesLoading}
          />
        )}
      {openReportModal && (
        <ReportModal
          isModalVisible={openReportModal}
          handleCancel={() => setOpenReportModal(false)}
          headerText="Report Image or title"
          type="property"
          managerId={selectedProperty.managerId}
          propertyId={selectedProperty.id}
        />
      )}
    </View>
  );
};

export default ResidentialRentalsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    paddingBottom: 10,
  },
});
