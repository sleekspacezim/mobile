import {
  Animated,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { usePropertiesContext } from "@/src/Context/PropertiesContext";
import { usePropertyFiltersContext } from "@/src/Context/PropertyFiltersContext";
import { useSharedContext } from "@/src/Context/SharedContext";
import { useSortPropertiesContext } from "@/src/Context/SortPropertiesContext";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { PropertyTypesEnum, SCREEN_BREAK_POINT } from "@/src/Utils/Constants";
import { getAllCommercialPropertiesForSaleHttpFunc } from "@/src/HttpServices/Queries/Properties/PropertiesHttpFuncs";
import EmptyPropertyList from "@/src/Components/EmptyPropertyList/EmptyPropertyList";
import HttpError from "@/src/Components/HttpError/HttpError";
import ReportModal from "@/src/Components/Modals/Report/ReportModal";
import { animatedHeaderHeight } from "../../Utils/Constants";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";
import PropertiesListMobileView from "./Components/PropertiesListMobileView";
import PropertiesListTableView from "./Components/PropertiesListTableView";
import { propertyTypeStyles } from "./Shared/Styles";

type Props = {
  setTotalproperties: React.Dispatch<React.SetStateAction<number>>;
  scrollAnimation: Animated.Value;
};

const CommercialForSaleList: React.FC<Props> = ({
  setTotalproperties,
  scrollAnimation,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [areMorePropertiesLoading, setAreMorePropertiesLoading] =
    useState<boolean>(false);
  const [loadMorehttpError, setloadMoreHttpError] = useState<string>("");
  const [httpError, setHttpError] = useState<string>("");
  const { sortCommercialForSalePropertiesBy } = useSortPropertiesContext();
  const { openReportModal, setOpenReportModal, selectedProperty } =
    useSharedContext();
  const { onSaleCommercialProperties, setOnSaleCommercialProperties } =
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
  } = usePropertyFiltersContext();

  const pageLimit = width > SCREEN_BREAK_POINT ? 30 : 12;

  const fetchProperties = () => {
    getAllCommercialPropertiesForSaleHttpFunc({
      page: 1,
      isUserLoggedIn: accessToken ? true : false,
      accessToken,
      pageLimit,
      sortBy: sortCommercialForSalePropertiesBy,
      priceMax: priceFilter.commercialForSale.max,
      priceMin: priceFilter.commercialForSale.min,
      currency: currencyFilter.commercialForsale,
      type: propertyStructureTypeFilter.commercialForsale,
      sizeDimension: propertySizeFilter.commercialForsale.dimension,
      sizeNumber: propertySizeFilter.commercialForsale.figure,
      numberOfRooms: totalRoomsFilter.commercialForsaleFigure,
    })
      .then(({ data: { properties, totalPages, count } }) => {
        setOnSaleCommercialProperties(properties);
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
    getAllCommercialPropertiesForSaleHttpFunc({
      page: 1,
      isUserLoggedIn: accessToken ? true : false,
      accessToken,
      pageLimit,
      sortBy: sortCommercialForSalePropertiesBy,
      priceMax: priceFilter.commercialForSale.max,
      priceMin: priceFilter.commercialForSale.min,
      currency: currencyFilter.commercialForsale,
      type: propertyStructureTypeFilter.commercialForsale,
      sizeDimension: propertySizeFilter.commercialForsale.dimension,
      sizeNumber: propertySizeFilter.commercialForsale.figure,
      numberOfRooms: totalRoomsFilter.commercialForsaleFigure,
    })
      .then(({ data: { properties, totalPages, count } }) => {
        setOnSaleCommercialProperties(properties);
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
      getAllCommercialPropertiesForSaleHttpFunc({
        page: pageNumber,
        isUserLoggedIn: accessToken ? true : false,
        accessToken,
        pageLimit,
        sortBy: sortCommercialForSalePropertiesBy,
        priceMax: priceFilter.commercialForSale.max,
        priceMin: priceFilter.commercialForSale.min,
        currency: currencyFilter.commercialForsale,
        type: propertyStructureTypeFilter.commercialForsale,
        sizeDimension: propertySizeFilter.commercialForsale.dimension,
        sizeNumber: propertySizeFilter.commercialForsale.figure,
        numberOfRooms: totalRoomsFilter.commercialForsaleFigure,
      })
        .then(({ data: { properties, totalPages, count } }) => {
          setOnSaleCommercialProperties([
            ...onSaleCommercialProperties,
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
    sortCommercialForSalePropertiesBy,
    priceFilter.commercialForSale,
    currencyFilter.commercialForsale,
    propertySizeFilter.commercialForsale,
    propertyStructureTypeFilter.commercialForsale,
    totalRoomsFilter.commercialForsaleFigure,
  ]);

  useEffect(() => {
    if (httpError) setTotalproperties(0);
  }, [httpError]);

  const text =
    "We currently do not have Commercial Properties Forsale, please try again soon. Please checkout other property types in the meantime.";

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
      {!httpError && !isLoading && onSaleCommercialProperties.length < 1 && (
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
        onSaleCommercialProperties.length > 0 &&
        width <= SCREEN_BREAK_POINT && (
          <PropertiesListMobileView
            propertyType={PropertyTypesEnum.CommercialForSale}
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
        onSaleCommercialProperties.length > 0 &&
        width > SCREEN_BREAK_POINT && (
          <PropertiesListTableView
            propertyType={PropertyTypesEnum.CommercialForSale}
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

export default CommercialForSaleList;
