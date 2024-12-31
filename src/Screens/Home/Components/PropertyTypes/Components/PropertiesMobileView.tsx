import {
  Animated,
  RefreshControl,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";

import PropertyCard from "@/src/Components/PropertyCard/PropertyCard";
import { pureWhite, primary } from "@/src/Theme/Colors";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import { animatedHeaderHeight } from "../../../Utils/Constants";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import FlatListOnEndReachedError from "@/src/Components/FlatListOnEndReachedError/FlatListOnEndReachedError";
import ButtonSpinner from "@/src/Components/Spinners/ButtonSpinner";
import { usePropertiesContext } from "@/src/Context/PropertiesContext";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";

type Props = {
  scrollAnimation: Animated.Value;
  propertyType:IPropertyType;
  isRefreshing: boolean;
  numberOfpages: number;
  pageNumber: number;
  loadMorehttpError: string;
  handleRefresh: IVoidFunc;
  loadMoreProperties: IVoidFunc;
} 

const PropertiesMobileView: React.FC<Props> = ({
  scrollAnimation,
  propertyType,
  isRefreshing,
  handleRefresh,
  loadMoreProperties,
  numberOfpages,
  pageNumber,
  loadMorehttpError,
}) => {
  const theme = useAppSelector((state) => state.theme.value);
  const {
    rentalResidentialProperties,
    rentalCommercialProperties,
    standProperties,
    landProperties,
    onSaleCommercialProperties,
    onSaleResidentialProperties,
  } = usePropertiesContext();
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
      {propertyType === PropertyTypesEnum.ResidentialForSale && (
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
          data={onSaleResidentialProperties}
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
              type={PropertyTypesEnum.ResidentialForSale}
              property={item}
            />
          )}
        />
      )}
      {propertyType === PropertyTypesEnum.CommercialRentals && (
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
          data={rentalCommercialProperties}
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
              type={PropertyTypesEnum.CommercialRentals}
              property={item}
            />
          )}
        />
      )}
      {propertyType === PropertyTypesEnum.CommercialForSale && (
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
          data={onSaleCommercialProperties}
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
              type={PropertyTypesEnum.CommercialForSale}
              property={item}
            />
          )}
        />
      )}
      {propertyType === PropertyTypesEnum.Land && (
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
          data={landProperties}
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
            <PropertyCard type={PropertyTypesEnum.Land} property={item} />
          )}
        />
      )}
      {propertyType === PropertyTypesEnum.Stands && (
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
          data={standProperties}
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
            <PropertyCard type={PropertyTypesEnum.Stands} property={item} />
          )}
        />
      )}
    </>
  );
};

export default PropertiesMobileView;
