import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";

import Screen from "@/src/Components/ScreenWrapper/Screen";
import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";

const Property: INoPropsReactComponent = () => {
  const { propertyType, id } = useLocalSearchParams<{
    propertyType: IPropertyType;
    id: string;
  }>();
  return (
    <Screen>
      <Text>{propertyType}</Text>
      <Text>{id}</Text>
      <CustomButton
        title="update"
        onPressFunc={() => router.push("/property/update/" + id)}
      />
    </Screen>
  );
};

export default Property;

const styles = StyleSheet.create({});
