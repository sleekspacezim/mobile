import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import Screen from "@/src/Components/ScreenWrapper/Screen";
import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import ResidentialRentalProperty from "./PropertyTypes/ResidentialRentalProperty";
import StackScreen from "@/src/Components/StackScreenWrapper/StackScreen";

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
          <ResidentialRentalProperty propertyId={Number(id)} />
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
