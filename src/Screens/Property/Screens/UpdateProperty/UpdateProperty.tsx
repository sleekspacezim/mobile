import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import Screen from "@/src/Components/ScreenWrapper/Screen";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import UpdateResidentialRental from "./Components/ResidentialRental/UpdateResidentialRental";
import StackScreen from "@/src/Components/StackScreenWrapper/StackScreen";

const UpdateProperty = () => {
  const { id, propertyType } = useLocalSearchParams<{
    id: string;
    propertyType: IPropertyType;
  }>();
  return (
    <Screen>
      <StackScreen>
      {propertyType === PropertyTypesEnum.ResidentialRentals && (
        <UpdateResidentialRental propertyId={Number(id)} />
      )}
      </StackScreen>
    </Screen>
  );
};

export default UpdateProperty;
