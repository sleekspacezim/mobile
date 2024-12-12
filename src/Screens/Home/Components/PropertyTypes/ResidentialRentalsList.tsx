import {
  Animated,
  RefreshControl,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import {
  BUTTON_MAX_WIDTH,
  PropertyTypesEnum,
  SCREEN_BREAK_POINT,
} from "@/src/Utils/Constants";
import { getAllResidentialRentalPropertiesHttpFunc } from "@/src/HttpServices/Queries/Properties/PropertiesHttpFuncs";
import HttpError from "@/src/Components/HttpError/HttpError";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";
import PropertyCard from "@/src/Components/PropertyCard/PropertyCard";
import EmptyPropertyList from "@/src/Components/EmptyPropertyList/EmptyPropertyList";
import ReportModal from "@/src/Components/Modals/Report/ReportModal";
import { useSharedContext } from "@/src/Context/SharedContext";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { usePropertiesContext } from "@/src/Context/PropertiesContext";
import ButtonSpinner from "@/src/Components/Spinners/ButtonSpinner";
import { primary, pureWhite } from "@/src/Theme/Colors";
import FlatListOnEndReachedError from "@/src/Components/FlatListOnEndReachedError/FlatListOnEndReachedError";
import OutlinedButton from "@/src/Components/Buttons/Outlined/OutlinedButton";
import { animatedHeaderHeight } from "../../Utils/Constants";

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
  const { openReportModal, setOpenReportModal, selectedProperty } =
    useSharedContext();
  const { rentalResidentialProperties, setRentalResidentialProperties } =
    usePropertiesContext();
  const [numberOfpages, setNumberOfPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { width } = useWindowDimensions();
  const { accessToken } = useAppSelector((state) => state.user.value);
  const theme = useAppSelector((state) => state.theme.value);

  const pageLimit = width > SCREEN_BREAK_POINT ? 30 : 12;

  const fetchProperties = () => {
    getAllResidentialRentalPropertiesHttpFunc({
      page: 1,
      isUserLoggedIn: accessToken ? true : false,
      accessToken,
      pageLimit,
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
  }, [accessToken]);

  useEffect(() => {
    if (httpError) setTotalproperties(0);
  }, [httpError]);

  const flatListFooter = () => {
    if (numberOfpages >= pageNumber && !loadMorehttpError) {
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
          <Animated.FlatList
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      y: scrollAnimation,
                    },
                  },
                },
              ],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
            bounces={false}
            data={rentalResidentialProperties}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
              gap: 20,
              alignItems: "center",
              justifyContent: "center",
              paddingTop: animatedHeaderHeight + 20,
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                progressBackgroundColor={theme === "dark" ? pureWhite : primary}
                tintColor={primary}
                colors={[theme === "dark" ? primary : pureWhite]}
              />
            }
            ListFooterComponent={flatListFooter()}
            onEndReached={loadMorehttpError ? undefined : loadMoreProperties}
            onEndReachedThreshold={0.8}
            renderItem={({ item }) => (
              <PropertyCard
                type={PropertyTypesEnum.ResidentialRentals}
                property={item}
              />
            )}
          />
        )}
      {!httpError &&
        !isLoading &&
        rentalResidentialProperties.length > 0 &&
        width > SCREEN_BREAK_POINT && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
              />
            }
          >
            <View style={styles.largeScreenWrapper}>
              {rentalResidentialProperties.map((property) => (
                <PropertyCard
                  type={PropertyTypesEnum.ResidentialRentals}
                  key={property.id}
                  property={property}
                />
              ))}
            </View>
            {loadMorehttpError ? (
              <View style={styles.loadMoreErrorContainerTablet}>
                <FlatListOnEndReachedError retryFunc={loadMoreProperties} />
              </View>
            ) : (
              numberOfpages >= pageNumber && (
                <View style={styles.loadMoreContainer}>
                  <OutlinedButton
                    color={primary}
                    title="load more"
                    onPressFunc={() => {
                      setAreMorePropertiesLoading(true);
                      loadMoreProperties();
                    }}
                    width={BUTTON_MAX_WIDTH}
                    isDisabled={areMorePropertiesLoading}
                    isLoading={areMorePropertiesLoading}
                  />
                </View>
              )
            )}
          </ScrollView>
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
  largeScreenWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  loadMoreContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    width: "100%",
  },
  loadMoreErrorContainerTablet: {
    width: BUTTON_MAX_WIDTH,
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
  },
});
