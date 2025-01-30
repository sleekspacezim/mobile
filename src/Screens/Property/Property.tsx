import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";

import Screen from "@/src/Components/ScreenWrapper/Screen";
import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { SafeAreaView } from "react-native-safe-area-context";
import ResidentialRentalProperty from "./PropertyTypes/ResidentialRentalProperty";
import StackScreen from "@/src/Components/StackScreenWrapper/StackScreen";

const Property: INoPropsReactComponent = () => {
  const { propertyType, id } = useLocalSearchParams<{
    propertyType: IPropertyType;
    id: string;
  }>();
  return (
    <Screen>
      <StackScreen>
        <View style={styles.container}>
        <ResidentialRentalProperty propertyId={Number(id)} />
        <CustomButton
          title="update"
          onPressFunc={() => router.push("/property/update/" + id)}
        />
        </View>
      </StackScreen>
    </Screen>
  );
};

export default Property;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
});
