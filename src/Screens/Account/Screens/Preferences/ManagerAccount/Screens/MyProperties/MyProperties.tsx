import { StyleSheet, View } from "react-native";
import React, { useState } from "react";

import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import Screen from "@/src/Components/ScreenWrapper/Screen";
import PropertyTypeList from "@/src/Components/PropertyTypeList/PropertyTypeList";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import MyRentalResidentialProperties from "./Components/PropertyTypeList/MyRentalResidentialProperties";
import TotalProperties from "@/src/Components/TotalProperties/TotalProperties";
import MyResidentialForSaleProperties from "./Components/PropertyTypeList/MyResidentialForSaleProperties";
import MyCommercialForSaleProperties from "./Components/PropertyTypeList/MyCommercialForSaleProperties";
import MyCommercialRentalProperties from "./Components/PropertyTypeList/MyCommercialRentalProperties";
import MyStandProperties from "./Components/PropertyTypeList/MyStandProperties";
import MyLandProperties from "./Components/PropertyTypeList/MyLandProperties";

const MyProperties: INoPropsReactComponent = () => {
  const [totalProperties, setTotalProperties] = useState<number>(0);
  const [activePropertyType, setActivePropertyType] = useState<IPropertyType>(
    PropertyTypesEnum.ResidentialRentals
  );
  return (
    <Screen>
      <View style={styles.container}>
        <PropertyTypeList
          activePropertyType={activePropertyType}
          setActivePropertyType={setActivePropertyType}
        />
        <TotalProperties
          totalProperties={totalProperties}
          activePropertyType={activePropertyType}
        />
        {activePropertyType === PropertyTypesEnum.ResidentialRentals && (
          <MyRentalResidentialProperties
            setTotalproperties={setTotalProperties}
          />
        )}
        {activePropertyType === PropertyTypesEnum.ResidentialForSale && (
          <MyResidentialForSaleProperties
            setTotalproperties={setTotalProperties}
          />
        )}
        {activePropertyType === PropertyTypesEnum.CommercialForSale && (
          <MyCommercialForSaleProperties
            setTotalproperties={setTotalProperties}
          />
        )}
        {activePropertyType === PropertyTypesEnum.CommercialRentals && (
          <MyCommercialRentalProperties
            setTotalproperties={setTotalProperties}
          />
        )}
        {activePropertyType === PropertyTypesEnum.Stands && (
          <MyStandProperties setTotalproperties={setTotalProperties} />
        )}
        {activePropertyType === PropertyTypesEnum.Land && (
          <MyLandProperties setTotalproperties={setTotalProperties} />
        )}
      </View>
    </Screen>
  );
};

export default MyProperties;

const styles = StyleSheet.create({
  container: {
    marginTop: 90,
    flex: 1,
    gap: 10,
  },
});
