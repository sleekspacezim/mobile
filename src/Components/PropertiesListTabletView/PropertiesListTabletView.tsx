import { View, ScrollView, RefreshControl, StyleSheet } from "react-native";
import React from "react";

import { BUTTON_MAX_WIDTH, PropertyTypesEnum } from "@/src/Utils/Constants";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import FlatListOnEndReachedError from "@/src/Components/FlatListOnEndReachedError/FlatListOnEndReachedError";
import OutlinedButton from "@/src/Components/Buttons/Outlined/OutlinedButton";
import { primary } from "@/src/Theme/Colors";
import PropertyCard from "@/src/Components/PropertyCard/PropertyCard";
import { ICommercialPropertyForSaleWithManager } from "@/src/GlobalTypes/Property/Commercial/ForSaleTypes";
import { ICommercialRentalPropertyWithManager } from "@/src/GlobalTypes/Property/Commercial/RentalTypes";
import { ILandPropertyWithManager } from "@/src/GlobalTypes/Property/Land/LandTypes";
import { IResidentialPropertyForSaleWithManager } from "@/src/GlobalTypes/Property/Residential/ForSaleTypes";
import { IResidentialRentalPropertyWithManager } from "@/src/GlobalTypes/Property/Residential/RentalTypes";
import { IStandPropertyWithManager } from "@/src/GlobalTypes/Property/Stand/StandTypes";

type Props =
  | {
      propertyType: PropertyTypesEnum.ResidentialRentals;
      isRefreshing: boolean;
      numberOfpages: number;
      pageNumber: number;
      loadMorehttpError: string;
      handleRefresh: IVoidFunc;
      loadMoreProperties: IVoidFunc;
      data: IResidentialRentalPropertyWithManager[];
      setAreMorePropertiesLoading: React.Dispatch<
        React.SetStateAction<boolean>
      >;
      areMorePropertiesLoading: boolean;
      setTotalProperties?: React.Dispatch<React.SetStateAction<number>>;
    }
  | {
      propertyType: PropertyTypesEnum.ResidentialForSale;
      isRefreshing: boolean;
      numberOfpages: number;
      pageNumber: number;
      loadMorehttpError: string;
      handleRefresh: IVoidFunc;
      loadMoreProperties: IVoidFunc;
      data: IResidentialPropertyForSaleWithManager[];
      setAreMorePropertiesLoading: React.Dispatch<
        React.SetStateAction<boolean>
      >;
      areMorePropertiesLoading: boolean;
      setTotalProperties?: React.Dispatch<React.SetStateAction<number>>;
    }
  | {
      propertyType: PropertyTypesEnum.Land;
      isRefreshing: boolean;
      numberOfpages: number;
      pageNumber: number;
      loadMorehttpError: string;
      handleRefresh: IVoidFunc;
      loadMoreProperties: IVoidFunc;
      data: ILandPropertyWithManager[];
      setAreMorePropertiesLoading: React.Dispatch<
        React.SetStateAction<boolean>
      >;
      areMorePropertiesLoading: boolean;
      setTotalProperties?: React.Dispatch<React.SetStateAction<number>>;
    }
  | {
      propertyType: PropertyTypesEnum.Stands;
      isRefreshing: boolean;
      numberOfpages: number;
      pageNumber: number;
      loadMorehttpError: string;
      handleRefresh: IVoidFunc;
      loadMoreProperties: IVoidFunc;
      data: IStandPropertyWithManager[];
      setAreMorePropertiesLoading: React.Dispatch<
        React.SetStateAction<boolean>
      >;
      areMorePropertiesLoading: boolean;
      setTotalProperties?: React.Dispatch<React.SetStateAction<number>>;
    }
  | {
      propertyType: PropertyTypesEnum.CommercialForSale;
      isRefreshing: boolean;
      numberOfpages: number;
      pageNumber: number;
      loadMorehttpError: string;
      handleRefresh: IVoidFunc;
      loadMoreProperties: IVoidFunc;
      data: ICommercialPropertyForSaleWithManager[];
      setAreMorePropertiesLoading: React.Dispatch<
        React.SetStateAction<boolean>
      >;
      areMorePropertiesLoading: boolean;
      setTotalProperties?: React.Dispatch<React.SetStateAction<number>>;
    }
  | {
      propertyType: PropertyTypesEnum.CommercialRentals;
      isRefreshing: boolean;
      numberOfpages: number;
      pageNumber: number;
      loadMorehttpError: string;
      handleRefresh: IVoidFunc;
      loadMoreProperties: IVoidFunc;
      data: ICommercialRentalPropertyWithManager[];
      setAreMorePropertiesLoading: React.Dispatch<
        React.SetStateAction<boolean>
      >;
      areMorePropertiesLoading: boolean;
      setTotalProperties?: React.Dispatch<React.SetStateAction<number>>;
    };

const PropertiesListTabletView: React.FC<Props> = ({
  pageNumber,
  numberOfpages,
  areMorePropertiesLoading,
  propertyType,
  isRefreshing,
  loadMoreProperties,
  loadMorehttpError,
  handleRefresh,
  setAreMorePropertiesLoading,
  setTotalProperties,
  data,
}) => {
  return (
    <>
      {propertyType === PropertyTypesEnum.ResidentialRentals && (
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
            {data.map((property) => (
              <PropertyCard
                setTotalProperties={setTotalProperties}
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
      {propertyType === PropertyTypesEnum.ResidentialForSale && (
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
            {data.map((property) => (
              <PropertyCard
                setTotalProperties={setTotalProperties}
                type={PropertyTypesEnum.ResidentialForSale}
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
      {propertyType === PropertyTypesEnum.CommercialForSale && (
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
            {data.map((property) => (
              <PropertyCard
                setTotalProperties={setTotalProperties}
                type={PropertyTypesEnum.CommercialForSale}
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
      {propertyType === PropertyTypesEnum.CommercialRentals && (
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
            {data.map((property) => (
              <PropertyCard
                setTotalProperties={setTotalProperties}
                type={PropertyTypesEnum.CommercialRentals}
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
      {propertyType === PropertyTypesEnum.Stands && (
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
            {data.map((property) => (
              <PropertyCard
                setTotalProperties={setTotalProperties}
                type={PropertyTypesEnum.Stands}
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
      {propertyType === PropertyTypesEnum.Land && (
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
            {data.map((property) => (
              <PropertyCard
                setTotalProperties={setTotalProperties}
                type={PropertyTypesEnum.Land}
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
    </>
  );
};

export default PropertiesListTabletView;

const styles = StyleSheet.create({
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
