import { Animated, useWindowDimensions, View } from "react-native";
import React, { useEffect, useState } from "react";

import { usePropertyFiltersContext } from "@/src/Context/PropertyFiltersContext";
import { usePropertiesContext } from "@/src/Context/PropertiesContext";
import { useSharedContext } from "@/src/Context/SharedContext";
import { useSortPropertiesContext } from "@/src/Context/SortPropertiesContext";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { PropertyTypesEnum, SCREEN_BREAK_POINT } from "@/src/Utils/Constants";
import { getAllResidentialPropertiesForSaleHttpFunc } from "@/src/HttpServices/Queries/Properties/PropertiesHttpFuncs";
import EmptyPropertyList from "@/src/Components/EmptyPropertyList/EmptyPropertyList";
import HttpError from "@/src/Components/HttpError/HttpError";
import ReportModal from "@/src/Components/Modals/Report/ReportModal";
import { animatedHeaderHeight } from "../../Utils/Constants";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";
import PropertiesListMobileView from "./Components/PropertiesListMobileView";
import PropertiesListTabletView from "./Components/PropertiesListTabletView";
import { propertyTypeStyles } from "./Shared/Styles";

type Props = {
  setTotalproperties: React.Dispatch<React.SetStateAction<number>>;
  scrollAnimation: Animated.Value;
};

const ResidentialForSaleList: React.FC<Props> = ({
  setTotalproperties,
  scrollAnimation,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [areMorePropertiesLoading, setAreMorePropertiesLoading] =
    useState<boolean>(false);
  const [loadMorehttpError, setloadMoreHttpError] = useState<string>("");
  const [httpError, setHttpError] = useState<string>("");
  const { sortResidentialForSalePropertiesBy } = useSortPropertiesContext();
  const { openReportModal, setOpenReportModal, selectedProperty } =
    useSharedContext();
  const { onSaleResidentialProperties, setOnSaleResidentialProperties } =
    usePropertiesContext();
  const [numberOfpages, setNumberOfPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { width } = useWindowDimensions();
  const { accessToken } = useAppSelector((state) => state.user.value);
  const {
    priceFilter,
    currencyFilter,
    propertySizeFilter,
    propertyStructureTypeFilter,
    totalRoomsFilter,
    bathroomsFilter,
    bedroomsFilter,
  } = usePropertyFiltersContext();

  const pageLimit = width > SCREEN_BREAK_POINT ? 30 : 12;

  const fetchProperties = () => {
    getAllResidentialPropertiesForSaleHttpFunc({
      page: 1,
      isUserLoggedIn: accessToken ? true : false,
      accessToken,
      pageLimit,
      sortBy: sortResidentialForSalePropertiesBy,
      priceMax: priceFilter.residentialForSale.max,
      priceMin: priceFilter.residentialForSale.min,
      currency: currencyFilter.residentialForsale,
      type: propertyStructureTypeFilter.residentialForsale,
      sizeDimension: propertySizeFilter.residentialForsale.dimension,
      sizeNumber: propertySizeFilter.residentialForsale.figure,
      bathroom: bathroomsFilter.residentialForsaleFigure,
      bedrooms: bedroomsFilter.residentialForsaleFigure,
      numberOfRooms: totalRoomsFilter.residentialForsaleFigure,
    })
      .then(({ data: { properties, totalPages, count } }) => {
        setOnSaleResidentialProperties(properties);
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
    getAllResidentialPropertiesForSaleHttpFunc({
      page: 1,
      isUserLoggedIn: accessToken ? true : false,
      accessToken,
      pageLimit,
      sortBy: sortResidentialForSalePropertiesBy,
      priceMax: priceFilter.residentialForSale.max,
      priceMin: priceFilter.residentialForSale.min,
      currency: currencyFilter.residentialForsale,
      type: propertyStructureTypeFilter.residentialForsale,
      sizeDimension: propertySizeFilter.residentialForsale.dimension,
      sizeNumber: propertySizeFilter.residentialForsale.figure,
      bathroom: bathroomsFilter.residentialForsaleFigure,
      bedrooms: bedroomsFilter.residentialForsaleFigure,
      numberOfRooms: totalRoomsFilter.residentialForsaleFigure,
    })
      .then(({ data: { properties, totalPages, count } }) => {
        setOnSaleResidentialProperties(properties);
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
      .finally(() => {
        setIsLoading(false)
        setIsRefreshing(false)
      });
  };

  const loadMoreProperties = () => {
    setloadMoreHttpError("");
    if (numberOfpages >= pageNumber) {
      getAllResidentialPropertiesForSaleHttpFunc({
        page: pageNumber,
        isUserLoggedIn: accessToken ? true : false,
        accessToken,
        pageLimit,
        sortBy: sortResidentialForSalePropertiesBy,
        priceMax: priceFilter.residentialForSale.max,
        priceMin: priceFilter.residentialForSale.min,
        currency: currencyFilter.residentialForsale,
        type: propertyStructureTypeFilter.residentialForsale,
        sizeDimension: propertySizeFilter.residentialForsale.dimension,
        sizeNumber: propertySizeFilter.residentialForsale.figure,
        bathroom: bathroomsFilter.residentialForsaleFigure,
        bedrooms: bedroomsFilter.residentialForsaleFigure,
        numberOfRooms: totalRoomsFilter.residentialForsaleFigure,
      })
        .then(({ data: { properties, totalPages, count } }) => {
          setOnSaleResidentialProperties([
            ...onSaleResidentialProperties,
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
    setTotalproperties(0)
    setIsRefreshing(true);
    setIsLoading(true)
    setOnSaleResidentialProperties([])
    refreshProperties();
  };

  useEffect(() => {
    setTotalproperties(0)
    fetchProperties();
  }, [
    accessToken,
    sortResidentialForSalePropertiesBy,
    priceFilter.residentialForSale,
    currencyFilter.residentialForsale,
    propertySizeFilter.residentialForsale,
    propertyStructureTypeFilter.residentialForsale,
    totalRoomsFilter.residentialForsaleFigure,
    bathroomsFilter.residentialForsaleFigure,
    bedroomsFilter.residentialForsaleFigure,
  ]);

  useEffect(() => {
    if (httpError) setTotalproperties(0);
  }, [httpError]);

  const text =
    "We currently do not have Residential Properties Forsale, please try again soon. Please checkout other property types in the meantime.";

  return (
    <View style={propertyTypeStyles.container}>
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
      {!httpError && !isLoading && onSaleResidentialProperties.length < 1 && (
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
        onSaleResidentialProperties.length > 0 &&
        width <= SCREEN_BREAK_POINT && (
          <PropertiesListMobileView
            propertyType={PropertyTypesEnum.ResidentialForSale}
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
        onSaleResidentialProperties.length > 0 &&
        width > SCREEN_BREAK_POINT && (
          <PropertiesListTabletView
            propertyType={PropertyTypesEnum.ResidentialForSale}
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

export default ResidentialForSaleList;
