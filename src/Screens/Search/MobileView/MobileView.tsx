import { Animated, RefreshControl, StyleSheet } from "react-native";
import React from "react";

import PropertyCard from "@/src/Components/PropertyCard/PropertyCard";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { useSearchByLocationPropertyResultsContext } from "@/src/Context/SearchByLocationPropertyResultsContext";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { pureWhite, primary } from "@/src/Theme/Colors";

type Props = {
  propertyType: IPropertyType;
  isRefreshing: boolean;
  loadMorehttpError: string;
  loadMoreProperties: IVoidFunc;
  handleRefresh: IVoidFunc;
  flatListFooter: () => React.JSX.Element | null;
};

const MobileView: React.FC<Props> = ({
  isRefreshing,
  loadMorehttpError,
  loadMoreProperties,
  handleRefresh,
  flatListFooter,
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

  const theme = useAppSelector((state) => state.theme.value);
  return (
    <>
      {propertyType === PropertyTypesEnum.CommercialForSale && (
        <Animated.FlatList
          scrollEventThrottle={16}
          bounces={false}
          data={onSaleCommercialPropertiesSearchResults}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.container}
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
              type={PropertyTypesEnum.CommercialForSale}
              property={item}
            />
          )}
        />
      )}
      {propertyType === PropertyTypesEnum.CommercialRentals && (
        <Animated.FlatList
          scrollEventThrottle={16}
          bounces={false}
          data={rentalCommercialPropertiesSearchResults}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.container}
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
              type={PropertyTypesEnum.CommercialRentals}
              property={item}
            />
          )}
        />
      )}
      {propertyType === PropertyTypesEnum.ResidentialForSale && (
        <Animated.FlatList
          scrollEventThrottle={16}
          bounces={false}
          data={onSaleResidentialPropertiesSearchResults}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.container}
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
              type={PropertyTypesEnum.ResidentialForSale}
              property={item}
            />
          )}
        />
      )}
      {propertyType === PropertyTypesEnum.ResidentialRentals && (
        <Animated.FlatList
          scrollEventThrottle={16}
          bounces={false}
          data={rentalResidentialPropertiesSearchResults}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.container}
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
      {propertyType === PropertyTypesEnum.Land && (
        <Animated.FlatList
          scrollEventThrottle={16}
          bounces={false}
          data={landPropertiesSearchResults}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.container}
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
            <PropertyCard type={PropertyTypesEnum.Land} property={item} />
          )}
        />
      )}
      {propertyType === PropertyTypesEnum.Stands && (
        <Animated.FlatList
          scrollEventThrottle={16}
          bounces={false}
          data={standPropertiesSearchResults}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.container}
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
            <PropertyCard type={PropertyTypesEnum.Stands} property={item} />
          )}
        />
      )}
    </>
  );
};

export default MobileView;

const styles = StyleSheet.create({
  container: {
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
