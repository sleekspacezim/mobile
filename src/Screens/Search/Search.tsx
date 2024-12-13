import { StyleSheet, useWindowDimensions, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import Screen from "@/src/Components/ScreenWrapper/Screen";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import Header from "./Header/Header";
import { ICommercialPropertyForSaleWithManager } from "@/src/GlobalTypes/Property/Commercial/ForSaleTypes";
import { ICommercialRentalPropertyWithManager } from "@/src/GlobalTypes/Property/Commercial/RentalTypes";
import { ILandPropertyWithManager } from "@/src/GlobalTypes/Property/Land/LandTypes";
import { IResidentialPropertyForSaleWithManager } from "@/src/GlobalTypes/Property/Residential/ForSaleTypes";
import { IResidentialRentalPropertyWithManager } from "@/src/GlobalTypes/Property/Residential/RentalTypes";
import { IStandPropertyWithManager } from "@/src/GlobalTypes/Property/Stand/StandTypes";
import {
  searchCommercialPropertiesForSaleByLocationHttpFunc,
  searchCommercialRentalPropertiesByLocationHttpFunc,
  searchResidentialRentalPropertiesByLocationHttpFunc,
  searchResidentialPropertiesForSaleByLocationHttpFunc,
  searchLandPropertiesByLocationHttpFunc,
  searchStandsByLocationHttpFunc,
} from "@/src/HttpServices/Queries/Properties/SearchPropertiesHttpFuncs";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { SCREEN_BREAK_POINT, PropertyTypesEnum } from "@/src/Utils/Constants";
import { useSharedContext } from "@/src/Context/SharedContext";
import EmptyPropertyList from "@/src/Components/EmptyPropertyList/EmptyPropertyList";
import FlatListOnEndReachedError from "@/src/Components/FlatListOnEndReachedError/FlatListOnEndReachedError";
import HttpError from "@/src/Components/HttpError/HttpError";
import ReportModal from "@/src/Components/Modals/Report/ReportModal";
import { primary } from "@/src/Theme/Colors";
import LoadingSkeleton from "../Home/Components/LoadingSkeleton/LoadingSkeleton";
import ButtonSpinner from "@/src/Components/Spinners/ButtonSpinner";
import MobileView from "./MobileView/MobileView";
import TableView from "./TabletView/TableView";
import { useSearchByLocationPropertyResultsContext } from "@/src/Context/SearchByLocationPropertyResultsContext";
import Row from "@/src/Components/Row/Row";
import RegularText from "@/src/Components/RegularText/RegularText";

import { shortenString } from "@/src/Utils/Funcs";

const Search: INoPropsReactComponent = () => {
  const { propertyType, location } = useLocalSearchParams<{
    propertyType: IPropertyType;
    location: string;
  }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [areMorePropertiesLoading, setAreMorePropertiesLoading] =
    useState<boolean>(false);
  const [loadMorehttpError, setloadMoreHttpError] = useState<string>("");
  const [httpError, setHttpError] = useState<string>("");
  const [numberOfpages, setNumberOfPages] = useState<number>(0);
  const [totalProperties, setTotalProperties] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const {
    landPropertiesSearchResults,
    standPropertiesSearchResults,
    onSaleCommercialPropertiesSearchResults,
    onSaleResidentialPropertiesSearchResults,
    rentalCommercialPropertiesSearchResults,
    rentalResidentialPropertiesSearchResults,
    setLandPropertiesSearchResults,
    setOnSaleCommercialPropertiesSearchResults,
    setOnSaleResidentialPropertiesSearchResults,
    setRentalCommercialPropertiesSearchResults,
    setRentalResidentialPropertiesSearchResults,
    setStandPropertiesSearchResults,
  } = useSearchByLocationPropertyResultsContext();

  const { accessToken } = useAppSelector((state) => state.user.value);
  const { openReportModal, setOpenReportModal, selectedProperty } =
    useSharedContext();
  const { width } = useWindowDimensions();
  const pageLimit = width > SCREEN_BREAK_POINT ? 30 : 12;

  const searchPropertyByLocationQueryFn = () => {
    if (propertyType === PropertyTypesEnum.CommercialForSale)
      return searchCommercialPropertiesForSaleByLocationHttpFunc;
    else if (propertyType === PropertyTypesEnum.CommercialRentals)
      return searchCommercialRentalPropertiesByLocationHttpFunc;
    else if (propertyType === PropertyTypesEnum.ResidentialRentals)
      return searchResidentialRentalPropertiesByLocationHttpFunc;
    else if (propertyType === PropertyTypesEnum.ResidentialForSale)
      return searchResidentialPropertiesForSaleByLocationHttpFunc;
    else if (propertyType === PropertyTypesEnum.Land)
      return searchLandPropertiesByLocationHttpFunc;
    else return searchStandsByLocationHttpFunc;
  };

  const clearAllProperties = () => {
    setLandPropertiesSearchResults([]);
    setOnSaleCommercialPropertiesSearchResults([]);
    setOnSaleResidentialPropertiesSearchResults([]);
    setStandPropertiesSearchResults([]);
    setRentalCommercialPropertiesSearchResults([]);
    setRentalResidentialPropertiesSearchResults([]);
  };

  const setProperties = (
    properties:
      | ICommercialPropertyForSaleWithManager[]
      | IStandPropertyWithManager[]
      | ICommercialRentalPropertyWithManager[]
      | IResidentialRentalPropertyWithManager[]
      | IResidentialPropertyForSaleWithManager[]
      | ILandPropertyWithManager[]
  ) => {
    if (propertyType === PropertyTypesEnum.CommercialForSale)
      return setOnSaleCommercialPropertiesSearchResults(
        properties as ICommercialPropertyForSaleWithManager[]
      );
    else if (propertyType === PropertyTypesEnum.CommercialRentals)
      return setRentalCommercialPropertiesSearchResults(
        properties as ICommercialRentalPropertyWithManager[]
      );
    else if (propertyType === PropertyTypesEnum.ResidentialRentals) {
      return setRentalResidentialPropertiesSearchResults(
        properties as IResidentialRentalPropertyWithManager[]
      );
    } else if (propertyType === PropertyTypesEnum.ResidentialForSale)
      return setOnSaleResidentialPropertiesSearchResults(
        properties as IResidentialPropertyForSaleWithManager[]
      );
    else if (propertyType === PropertyTypesEnum.Land)
      return setLandPropertiesSearchResults(
        properties as ILandPropertyWithManager[]
      );
    else
      return setStandPropertiesSearchResults(
        properties as IStandPropertyWithManager[]
      );
  };

  const addMoreProperties = (
    properties:
      | ICommercialPropertyForSaleWithManager[]
      | IStandPropertyWithManager[]
      | ICommercialRentalPropertyWithManager[]
      | IResidentialRentalPropertyWithManager[]
      | IResidentialPropertyForSaleWithManager[]
      | ILandPropertyWithManager[]
  ) => {
    if (propertyType === PropertyTypesEnum.CommercialForSale)
      return setOnSaleCommercialPropertiesSearchResults([
        ...onSaleCommercialPropertiesSearchResults,
        ...(properties as ICommercialPropertyForSaleWithManager[]),
      ]);
    else if (propertyType === PropertyTypesEnum.CommercialRentals)
      return setRentalCommercialPropertiesSearchResults([
        ...rentalCommercialPropertiesSearchResults,
        ...(properties as ICommercialRentalPropertyWithManager[]),
      ]);
    else if (propertyType === PropertyTypesEnum.ResidentialRentals)
      return setRentalResidentialPropertiesSearchResults([
        ...rentalResidentialPropertiesSearchResults,
        ...(properties as IResidentialRentalPropertyWithManager[]),
      ]);
    else if (propertyType === PropertyTypesEnum.ResidentialForSale)
      return setOnSaleResidentialPropertiesSearchResults([
        ...onSaleResidentialPropertiesSearchResults,
        ...(properties as IResidentialPropertyForSaleWithManager[]),
      ]);
    else if (propertyType === PropertyTypesEnum.Land)
      return setLandPropertiesSearchResults([
        ...landPropertiesSearchResults,
        ...(properties as ILandPropertyWithManager[]),
      ]);
    else
      return setStandPropertiesSearchResults([
        ...standPropertiesSearchResults,
        ...(properties as IStandPropertyWithManager[]),
      ]);
  };

  const fetchProperties = () => {
    setIsLoading(true);
    searchPropertyByLocationQueryFn()({
      page: 1,
      pageLimit,
      isUserLoggedIn: accessToken ? true : false,
      accessToken,
      location: location as string,
    })
      .then(({ data: { properties, totalPages, count } }) => {
        setProperties(properties);
        setNumberOfPages(totalPages);
        setTotalProperties(count);
        setPageNumber(2);
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
    searchPropertyByLocationQueryFn()({
      page: 1,
      pageLimit,
      isUserLoggedIn: accessToken ? true : false,
      accessToken,
      location: location as string,
    })
      .then(({ data: { properties, totalPages, count } }) => {
        setProperties(properties);
        setNumberOfPages(totalPages);
        setTotalProperties(count);
        setPageNumber(2);
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
      searchPropertyByLocationQueryFn()({
        page: pageNumber,
        isUserLoggedIn: accessToken ? true : false,
        accessToken,
        pageLimit,
        location: location as string,
      })
        .then(({ data: { properties, totalPages, count } }) => {
          addMoreProperties(properties);
          setNumberOfPages(totalPages);
          setTotalProperties(count);
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
    clearAllProperties();
    setPageNumber(1);
    setIsRefreshing(true);
    refreshProperties();
  };

  useEffect(() => {
    clearAllProperties();
    fetchProperties();
    return () => {
      clearAllProperties();
    };
  }, [accessToken, propertyType, location]);

  useEffect(() => {
    if (httpError) setTotalProperties(0);
  }, [httpError]);

  const flatListFooter = () => {
    if (numberOfpages >= pageNumber && !loadMorehttpError && !isRefreshing) {
      return <ButtonSpinner backGroundColor={primary} />;
    }
    if (loadMorehttpError)
      return (
        <View style={{ width: width - 20 }}>
          <FlatListOnEndReachedError retryFunc={loadMoreProperties} />
        </View>
      );
    else return null;
  };

  const errorRetryFunc = () => {
    setHttpError("");
    setIsLoading(true);
    fetchProperties();
  };

  const text = `There are no listed properties at this location for now, please try searching another location.`;
  return (
    <Screen>
      <SafeAreaView style={styles.container}>
        <Header propertyType={propertyType as IPropertyType} />
        <View style={styles.textContainer}>
          <Row style={{ gap: 5 }}>
            <ThemedText type="subHeader">Location:</ThemedText>
            <RegularText style={{ marginTop: 1 }}>
              {width > SCREEN_BREAK_POINT
                ? location
                : shortenString(location as string, 27)}
            </RegularText>
          </Row>
        </View>
        {isLoading && <LoadingSkeleton />}
        {httpError && (
          <View
            style={{
              flex: 1,
            }}
          >
            <HttpError retryFunc={errorRetryFunc} />
          </View>
        )}
        {!httpError && !isLoading && totalProperties < 1 && (
          <View
            style={{
              flex: 1,
            }}
          >
            <EmptyPropertyList text={text} />
          </View>
        )}
        {!httpError &&
          !isLoading &&
          totalProperties > 0 &&
          width <= SCREEN_BREAK_POINT && (
            <MobileView
              propertyType={propertyType as IPropertyType}
              loadMoreProperties={loadMoreProperties}
              loadMorehttpError={loadMorehttpError}
              handleRefresh={handleRefresh}
              isRefreshing={isRefreshing}
              flatListFooter={flatListFooter}
            />
          )}
        {!httpError &&
          !isLoading &&
          totalProperties > 0 &&
          width > SCREEN_BREAK_POINT && (
            <TableView
              propertyType={propertyType as IPropertyType}
              loadMoreProperties={loadMoreProperties}
              loadMorehttpError={loadMorehttpError}
              numberOfpages={numberOfpages}
              pageNumber={pageNumber}
              isRefreshing={isRefreshing}
              setAreMorePropertiesLoading={setAreMorePropertiesLoading}
              handleRefresh={handleRefresh}
              areMorePropertiesLoading={areMorePropertiesLoading}
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
      </SafeAreaView>
    </Screen>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    paddingBottom: 10,
  },
  textContainer: {
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 5,
  },
});
