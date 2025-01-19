import { View, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";

import { useFavoritesPropertiesContext } from "@/src/Context/FavoritesPropertiesContext";
import EmptyPropertyList from "@/src/Components/EmptyPropertyList/EmptyPropertyList";
import HttpError from "@/src/Components/HttpError/HttpError";
import ReportModal from "@/src/Components/Modals/Report/ReportModal";
import { useSharedContext } from "@/src/Context/SharedContext";
import { getCommercialRentalPropertyFavoritesHttpFunc } from "@/src/HttpServices/Queries/Properties/FavoritesHttpFuncs";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import LoadingSkeleton from "@/src/Screens/Home/Components/LoadingSkeleton/LoadingSkeleton";
import { SCREEN_BREAK_POINT, PropertyTypesEnum } from "@/src/Utils/Constants";
import FavoritesListMobileView from "../../../../Components/PropertiesListMobileView/PropertiesListMobileView";
import FavoritesListTabletView from "../../../../Components/PropertiesListTabletView/PropertiesListTabletView";
import { favoritePropertyTypeStyles } from "../Shared/Styles";

type Props = {
  setTotalproperties: React.Dispatch<React.SetStateAction<number>>;
};

const FavoriteCommercialRentals: React.FC<Props> = ({ setTotalproperties }) => {
  const {
    rentalCommercialFavoriteProperties,
    setRentalCommercialFavoriteProperties,
  } = useFavoritesPropertiesContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [areMorePropertiesLoading, setAreMorePropertiesLoading] =
    useState<boolean>(false);
  const [loadMorehttpError, setloadMoreHttpError] = useState<string>("");
  const [httpError, setHttpError] = useState<string>("");
  const [numberOfpages, setNumberOfPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { width } = useWindowDimensions();
  const { openReportModal, setOpenReportModal, selectedProperty } =
    useSharedContext();
  const { accessToken, id } = useAppSelector((state) => state.user.value);
  const pageLimit = width > SCREEN_BREAK_POINT ? 30 : 12;

  const fetchProperties = () => {
    getCommercialRentalPropertyFavoritesHttpFunc({
      page: 1,
      accessToken,
      pageLimit,
      userId: id,
    })
      .then(({ data: { properties, totalPages, count } }) => {
        setRentalCommercialFavoriteProperties(properties);
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
    getCommercialRentalPropertyFavoritesHttpFunc({
      page: 1,
      userId: id,
      accessToken,
      pageLimit,
    })
      .then(({ data: { properties, totalPages, count } }) => {
        setRentalCommercialFavoriteProperties(properties);
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
      getCommercialRentalPropertyFavoritesHttpFunc({
        page: pageNumber,
        userId: id,
        accessToken,
        pageLimit,
      })
        .then(({ data: { properties, totalPages, count } }) => {
          setRentalCommercialFavoriteProperties([
            ...rentalCommercialFavoriteProperties,
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
    setIsRefreshing(true);
    setPageNumber(1);
    setRentalCommercialFavoriteProperties([]);
    refreshProperties();
  };

  useEffect(() => {
    fetchProperties();
  }, [accessToken, id]);

  useEffect(() => {
    if (httpError) setTotalproperties(0);
  }, [httpError]);

  const text =
    "You currently do not have favorite rental commercial properties.";

  return (
    <View style={favoritePropertyTypeStyles.container}>
      {isLoading && <LoadingSkeleton />}
      {httpError && (
        <View
          style={{
            flex: 1,
            paddingTop: 0,
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
      {!httpError &&
        !isLoading &&
        rentalCommercialFavoriteProperties.length < 1 && (
          <View
            style={{
              flex: 1,
              paddingTop: 0,
            }}
          >
            <EmptyPropertyList text={text} />
          </View>
        )}
      {!httpError &&
        !isLoading &&
        rentalCommercialFavoriteProperties.length > 0 &&
        width <= SCREEN_BREAK_POINT && (
          <FavoritesListMobileView
            propertyType={PropertyTypesEnum.CommercialRentals}
            loadMorehttpError={loadMorehttpError}
            pageNumber={pageNumber}
            data={rentalCommercialFavoriteProperties}
            numberOfpages={numberOfpages}
            isRefreshing={isRefreshing}
            loadMoreProperties={loadMoreProperties}
            handleRefresh={handleRefresh}
            setTotalProperties={setTotalproperties}
          />
        )}
      {!httpError &&
        !isLoading &&
        rentalCommercialFavoriteProperties.length > 0 &&
        width > SCREEN_BREAK_POINT && (
          <FavoritesListTabletView
            propertyType={PropertyTypesEnum.CommercialRentals}
            loadMorehttpError={loadMorehttpError}
            pageNumber={pageNumber}
            data={rentalCommercialFavoriteProperties}
            numberOfpages={numberOfpages}
            isRefreshing={isRefreshing}
            loadMoreProperties={loadMoreProperties}
            handleRefresh={handleRefresh}
            areMorePropertiesLoading={areMorePropertiesLoading}
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

export default FavoriteCommercialRentals;
