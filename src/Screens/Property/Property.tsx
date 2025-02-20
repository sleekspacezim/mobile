import { StyleSheet, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import Screen from "@/src/Components/ScreenWrapper/Screen";
import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import ResidentialRentalProperty from "./PropertyTypes/ResidentialRentalProperty";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import ResidentialForSaleProperty from "./PropertyTypes/ResidentialForSaleProperty";
import CommercialForsaleProperty from "./PropertyTypes/CommercialForsaleProperty";
import Stand from "./PropertyTypes/Stand";
import Land from "./PropertyTypes/Land";
import CommercialRentalProperty from "./PropertyTypes/CommercialRentalProperty";

const Property: INoPropsReactComponent = () => {
  const { propertyType, id } = useLocalSearchParams<{
    propertyType: IPropertyType;
    id: string;
  }>();
  
  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header} />
        <View style={styles.container}>
          {propertyType === PropertyTypesEnum.ResidentialRentals && (
            <ResidentialRentalProperty propertyId={Number(id)} />
          )}
          {propertyType === PropertyTypesEnum.ResidentialForSale && (
            <ResidentialForSaleProperty propertyId={Number(id)} />
          )}
          {propertyType === PropertyTypesEnum.CommercialForSale && (
            <CommercialForsaleProperty propertyId={Number(id)} />
          )}
          {propertyType === PropertyTypesEnum.CommercialRentals && (
            <CommercialRentalProperty propertyId={Number(id)} />
          )}
          {propertyType === PropertyTypesEnum.Stands && (
            <Stand propertyId={Number(id)} />
          )}
          {propertyType === PropertyTypesEnum.Land && (
            <Land propertyId={Number(id)} />
          )}
        </View>
      </SafeAreaView>
    </Screen>
  );
};

export default Property;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    flexGrow: 1,
  },
  header: {
    height: 50,
  },
});
