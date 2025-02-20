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
import { getAllLandPropertiesHttpFunc } from "@/src/HttpServices/Queries/Properties/PropertiesHttpFuncs";
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

const LandsList: React.FC<Props> = ({
  setTotalproperties,
  scrollAnimation,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [areMorePropertiesLoading, setAreMorePropertiesLoading] =
    useState<boolean>(false);
  const [loadMorehttpError, setloadMoreHttpError] = useState<string>("");
  const [httpError, setHttpError] = useState<string>("");
  const { sortLandPropertiesBy } = useSortPropertiesContext();
  const { openReportModal, setOpenReportModal, selectedProperty } =
    useSharedContext();
  const { landProperties, setLandProperties } = usePropertiesContext();
  const [numberOfpages, setNumberOfPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { width } = useWindowDimensions();
  const { accessToken } = useAppSelector((state) => state.user.value);
  const {
    priceFilter,
    currencyFilter,
    propertySizeFilter,
    propertyStructureTypeFilter,
  } = usePropertyFiltersContext();

  const pageLimit = width > SCREEN_BREAK_POINT ? 30 : 12;

  const fetchProperties = () => {
    getAllLandPropertiesHttpFunc({
      page: 1,
      isUserLoggedIn: accessToken ? true : false,
      accessToken,
      pageLimit,
      sortBy: sortLandPropertiesBy,
      priceMax: priceFilter.land.max,
      priceMin: priceFilter.land.min,
      currency: currencyFilter.land,
      type: propertyStructureTypeFilter.land,
      sizeDimension: propertySizeFilter.land.dimension,
      sizeNumber: propertySizeFilter.land.figure,
    })
      .then(({ data: { properties, totalPages, count } }) => {
        setLandProperties(properties);
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
    getAllLandPropertiesHttpFunc({
      page: 1,
      isUserLoggedIn: accessToken ? true : false,
      accessToken,
      pageLimit,
      sortBy: sortLandPropertiesBy,
      priceMax: priceFilter.land.max,
      priceMin: priceFilter.land.min,
      currency: currencyFilter.land,
      type: propertyStructureTypeFilter.land,
      sizeDimension: propertySizeFilter.land.dimension,
      sizeNumber: propertySizeFilter.land.figure,
    })
      .then(({ data: { properties, totalPages, count } }) => {
        setLandProperties(properties);
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
      getAllLandPropertiesHttpFunc({
        page: pageNumber,
        isUserLoggedIn: accessToken ? true : false,
        accessToken,
        pageLimit,
        sortBy: sortLandPropertiesBy,
        priceMax: priceFilter.land.max,
        priceMin: priceFilter.land.min,
        currency: currencyFilter.land,
        type: propertyStructureTypeFilter.land,
        sizeDimension: propertySizeFilter.land.dimension,
        sizeNumber: propertySizeFilter.land.figure,
      })
        .then(({ data: { properties, totalPages, count } }) => {
          setLandProperties([...landProperties, ...properties]);
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
    setLandProperties([])
    refreshProperties();
  };

  useEffect(() => {
    setTotalproperties(0)
    fetchProperties();
  }, [
    accessToken,
    sortLandPropertiesBy,
    priceFilter.land,
    currencyFilter.land,
    propertySizeFilter.land,
    propertyStructureTypeFilter.land,
  ]);

  useEffect(() => {
    if (httpError) setTotalproperties(0);
  }, [httpError]);

  const text =
    "We currently do not have Land properties, please try again soon. Please checkout other property types in the meantime.";

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
      {!httpError && !isLoading && landProperties.length < 1 && (
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
        landProperties.length > 0 &&
        width <= SCREEN_BREAK_POINT && (
          <PropertiesListMobileView
            propertyType={PropertyTypesEnum.Land}
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
        landProperties.length > 0 &&
        width > SCREEN_BREAK_POINT && (
          <PropertiesListTabletView
            propertyType={PropertyTypesEnum.Land}
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

export default LandsList;
