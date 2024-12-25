import { FlatList, StyleSheet, View } from "react-native";
import React, { useRef } from "react";

import { PropertyTypesEnum } from "@/src/Utils/Constants";
import PropertyTypeItem from "./PropertyTypeItem/PropertyType";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";

const PropertyTypeList: INoPropsReactComponent = () => {
  const flatlistRef = useRef<FlatList | null>(null);
  const propertyTypeList: IPropertyType[] = [
    PropertyTypesEnum.ResidentialRentals,
    PropertyTypesEnum.ResidentialForSale,
    PropertyTypesEnum.CommercialForSale,
    PropertyTypesEnum.CommercialRentals,
    PropertyTypesEnum.Stands,
    PropertyTypesEnum.Land,
  ];

  const scrollToIndex = (index: number) => {
    flatlistRef.current?.scrollToIndex({ animated: true, index });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={propertyTypeList}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        ref={flatlistRef}
        horizontal
        renderItem={({ item }) => (
          <PropertyTypeItem
            propertyType={item}
            onPressFlatListScrollFunc={() =>
              scrollToIndex(propertyTypeList.indexOf(item))
            }
          />
        )}
      />
    </View>
  );
};

export default PropertyTypeList;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: "100%",
  },
});
