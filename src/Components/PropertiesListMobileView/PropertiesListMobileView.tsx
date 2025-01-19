import {
  FlatList,
  RefreshControl,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";

import { PropertyTypesEnum } from "@/src/Utils/Constants";
import { ICommercialRentalPropertyWithManager } from "@/src/GlobalTypes/Property/Commercial/RentalTypes";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { IResidentialRentalPropertyWithManager } from "@/src/GlobalTypes/Property/Residential/RentalTypes";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import ButtonSpinner from "@/src/Components/Spinners/ButtonSpinner";
import FlatListOnEndReachedError from "@/src/Components/FlatListOnEndReachedError/FlatListOnEndReachedError";
import { primary, pureWhite } from "@/src/Theme/Colors";
import PropertyCard from "@/src/Components/PropertyCard/PropertyCard";
import { IResidentialPropertyForSaleWithManager } from "@/src/GlobalTypes/Property/Residential/ForSaleTypes";
import { ICommercialPropertyForSaleWithManager } from "@/src/GlobalTypes/Property/Commercial/ForSaleTypes";
import { IStandPropertyWithManager } from "@/src/GlobalTypes/Property/Stand/StandTypes";
import { ILandPropertyWithManager } from "@/src/GlobalTypes/Property/Land/LandTypes";

type Props =
  | {
      propertyType: PropertyTypesEnum.ResidentialRentals;
      isRefreshing: boolean;
      numberOfpages: number;
      pageNumber: number;
      loadMorehttpError: string;
      handleRefresh: IVoidFunc;
      loadMoreProperties: IVoidFunc;
      setTotalProperties?: React.Dispatch<React.SetStateAction<number>>;
      data: IResidentialRentalPropertyWithManager[];
    }
  | {
      propertyType: PropertyTypesEnum.ResidentialForSale;
      isRefreshing: boolean;
      numberOfpages: number;
      pageNumber: number;
      loadMorehttpError: string;
      handleRefresh: IVoidFunc;
      setTotalProperties?: React.Dispatch<React.SetStateAction<number>>;
      loadMoreProperties: IVoidFunc;
      data: IResidentialPropertyForSaleWithManager[];
    }
  | {
      propertyType: PropertyTypesEnum.Land;
      isRefreshing: boolean;
      numberOfpages: number;
      pageNumber: number;
      loadMorehttpError: string;
      setTotalProperties?: React.Dispatch<React.SetStateAction<number>>;
      handleRefresh: IVoidFunc;
      loadMoreProperties: IVoidFunc;
      data: ILandPropertyWithManager[];
    }
  | {
      propertyType: PropertyTypesEnum.Stands;
      isRefreshing: boolean;
      numberOfpages: number;
      pageNumber: number;
      loadMorehttpError: string;
      handleRefresh: IVoidFunc;
      setTotalProperties?: React.Dispatch<React.SetStateAction<number>>;
      loadMoreProperties: IVoidFunc;
      data: IStandPropertyWithManager[];
    }
  | {
      propertyType: PropertyTypesEnum.CommercialForSale;
      isRefreshing: boolean;
      numberOfpages: number;
      pageNumber: number;
      loadMorehttpError: string;
      handleRefresh: IVoidFunc;
      loadMoreProperties: IVoidFunc;
      setTotalProperties?: React.Dispatch<React.SetStateAction<number>>;
      data: ICommercialPropertyForSaleWithManager[];
    }
  | {
      propertyType: PropertyTypesEnum.CommercialRentals;
      isRefreshing: boolean;
      numberOfpages: number;
      pageNumber: number;
      loadMorehttpError: string;
      setTotalProperties?: React.Dispatch<React.SetStateAction<number>>;
      handleRefresh: IVoidFunc;
      loadMoreProperties: IVoidFunc;
      data: ICommercialRentalPropertyWithManager[];
    };

const PropertiesListMobileView: React.FC<Props> = ({
  propertyType,
  isRefreshing,
  handleRefresh,
  loadMoreProperties,
  setTotalProperties,
  numberOfpages,
  pageNumber,
  loadMorehttpError,
  data,
}) => {
  const theme = useAppSelector((state) => state.theme.value);
  const { width } = useWindowDimensions();
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
  return (
    <>
      {propertyType === PropertyTypesEnum.ResidentialRentals && (
        <FlatList
          scrollEventThrottle={16}
          bounces={false}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            gap: 20,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 20,
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
              isOnfavoritesScreen
              setTotalProperties={setTotalProperties}
            />
          )}
        />
      )}
      {propertyType === PropertyTypesEnum.ResidentialForSale && (
        <FlatList
          scrollEventThrottle={16}
          bounces={false}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            gap: 20,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 20,
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
              type={PropertyTypesEnum.ResidentialForSale}
              property={item}
              isOnfavoritesScreen
              setTotalProperties={setTotalProperties}
            />
          )}
        />
      )}
      {propertyType === PropertyTypesEnum.CommercialRentals && (
        <FlatList
          scrollEventThrottle={16}
          bounces={false}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            gap: 20,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 20,
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
              type={PropertyTypesEnum.CommercialRentals}
              property={item}
              isOnfavoritesScreen
              setTotalProperties={setTotalProperties}
            />
          )}
        />
      )}
      {propertyType === PropertyTypesEnum.CommercialForSale && (
        <FlatList
          scrollEventThrottle={16}
          bounces={false}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            gap: 20,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 20,
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
              type={PropertyTypesEnum.CommercialForSale}
              property={item}
              isOnfavoritesScreen
              setTotalProperties={setTotalProperties}
            />
          )}
        />
      )}
      {propertyType === PropertyTypesEnum.Land && (
        <FlatList
          scrollEventThrottle={16}
          bounces={false}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            gap: 20,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 20,
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
              type={PropertyTypesEnum.Land}
              property={item}
              isOnfavoritesScreen
              setTotalProperties={setTotalProperties}
            />
          )}
        />
      )}
      {propertyType === PropertyTypesEnum.Stands && (
        <FlatList
          scrollEventThrottle={16}
          bounces={false}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            gap: 20,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 20,
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
              type={PropertyTypesEnum.Stands}
              property={item}
              isOnfavoritesScreen
              setTotalProperties={setTotalProperties}
            />
          )}
        />
      )}
    </>
  );
};

export default PropertiesListMobileView;
