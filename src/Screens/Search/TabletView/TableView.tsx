import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import React from "react";

import { BUTTON_MAX_WIDTH, PropertyTypesEnum } from "@/src/Utils/Constants";
import FlatListOnEndReachedError from "@/src/Components/FlatListOnEndReachedError/FlatListOnEndReachedError";
import OutlinedButton from "@/src/Components/Buttons/Outlined/OutlinedButton";
import PropertyCard from "@/src/Components/PropertyCard/PropertyCard";
import { primary } from "@/src/Theme/Colors";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { useSearchByLocationPropertyResultsContext } from "@/src/Context/SearchByLocationPropertyResultsContext";

type Props = {
  propertyType: IPropertyType;
  isRefreshing: boolean;
  areMorePropertiesLoading: boolean;
  loadMorehttpError: string;
  numberOfpages: number;
  pageNumber: number;
  handleRefresh: IVoidFunc;
  loadMoreProperties: IVoidFunc;
  setAreMorePropertiesLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const TableView: React.FC<Props> = ({
  isRefreshing,
  numberOfpages,
  pageNumber,
  handleRefresh,
  loadMoreProperties,
  setAreMorePropertiesLoading,
  areMorePropertiesLoading,
  loadMorehttpError,
  propertyType,
}) => {
  const {
    landPropertiesSearchResults,
    standPropertiesSearchResults,
    onSaleCommercialPropertiesSearchResults,
    onSaleResidentialPropertiesSearchResults,
    rentalCommercialPropertiesSearchResults,
    rentalResidentialPropertiesSearchResults,
  } = useSearchByLocationPropertyResultsContext();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.largeScreenWrapper}>
        {propertyType === PropertyTypesEnum.CommercialForSale &&
          onSaleCommercialPropertiesSearchResults.map((property) => (
            <PropertyCard
              type={PropertyTypesEnum.CommercialForSale}
              key={property.id}
              property={property}
            />
          ))}
        {propertyType === PropertyTypesEnum.CommercialRentals &&
          rentalCommercialPropertiesSearchResults.map((property) => (
            <PropertyCard
              type={PropertyTypesEnum.CommercialRentals}
              key={property.id}
              property={property}
            />
          ))}
        {propertyType === PropertyTypesEnum.ResidentialForSale &&
          onSaleResidentialPropertiesSearchResults.map((property) => (
            <PropertyCard
              type={PropertyTypesEnum.ResidentialForSale}
              key={property.id}
              property={property}
            />
          ))}
        {propertyType === PropertyTypesEnum.ResidentialRentals &&
          rentalResidentialPropertiesSearchResults.map((property) => (
            <PropertyCard
              type={PropertyTypesEnum.ResidentialRentals}
              key={property.id}
              property={property}
            />
          ))}
        {propertyType === PropertyTypesEnum.Land &&
          landPropertiesSearchResults.map((property) => (
            <PropertyCard
              type={PropertyTypesEnum.Land}
              key={property.id}
              property={property}
            />
          ))}
        {propertyType === PropertyTypesEnum.Stands &&
          standPropertiesSearchResults.map((property) => (
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
  );
};

export default TableView;

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
