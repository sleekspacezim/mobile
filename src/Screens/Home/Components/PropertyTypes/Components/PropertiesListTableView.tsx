import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React from "react";

import OutlinedButton from "@/src/Components/Buttons/Outlined/OutlinedButton";
import FlatListOnEndReachedError from "@/src/Components/FlatListOnEndReachedError/FlatListOnEndReachedError";
import PropertyCard from "@/src/Components/PropertyCard/PropertyCard";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { primary } from "@/src/Theme/Colors";
import { PropertyTypesEnum, BUTTON_MAX_WIDTH } from "@/src/Utils/Constants";
import { usePropertiesContext } from "@/src/Context/PropertiesContext";

type Props = {
  propertyType: IPropertyType;
  isRefreshing: boolean;
  areMorePropertiesLoading: boolean;
  numberOfpages: number;
  pageNumber: number;
  loadMorehttpError: string;
  handleRefresh: IVoidFunc;
  loadMoreProperties: IVoidFunc;
  setAreMorePropertiesLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const PropertiesListTableView: React.FC<Props> = ({
  pageNumber,
  numberOfpages,
  areMorePropertiesLoading,
  propertyType,
  isRefreshing,
  loadMoreProperties,
  loadMorehttpError,
  handleRefresh,
  setAreMorePropertiesLoading,
}) => {
  const {
    rentalResidentialProperties,
    rentalCommercialProperties,
    standProperties,
    landProperties,
    onSaleCommercialProperties,
    onSaleResidentialProperties,
  } = usePropertiesContext();

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
            {onSaleResidentialProperties.map((property) => (
              <PropertyCard
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
            {onSaleCommercialProperties.map((property) => (
              <PropertyCard
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
            {rentalCommercialProperties.map((property) => (
              <PropertyCard
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
            {standProperties.map((property) => (
              <PropertyCard
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
            {landProperties.map((property) => (
              <PropertyCard
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

export default PropertiesListTableView;

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
