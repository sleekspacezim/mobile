import { useRouter, Stack } from "expo-router";
import React from "react";

import HeaderIcon from "@/src/Components/Navigation/HeaderIcon/HeaderIcon";
import StackWrapper from "@/src/HOCs/StackWrapper";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { light, dark } from "@/src/Theme/Colors";
import { family } from "@/src/Theme/Font";

const ManagerLayout = () => {
  const theme = useAppSelector((state) => state.theme.value);
  const route = useRouter();
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          color: theme === "light" ? light.text : dark.text,
          fontFamily: family,
        },
        headerLeft: () => (
          <HeaderIcon iconName="arrow-back" onPressFunc={() => route.back()} />
        ),
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="manager/index"
        options={{
          headerTitle: "Manager Account",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="manager/createAccount"
        options={{
          headerTitle: "Create Account",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="manager/update"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="manager/properties"
        options={{
          headerTitle: "My Properties",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};

export default StackWrapper(ManagerLayout);
