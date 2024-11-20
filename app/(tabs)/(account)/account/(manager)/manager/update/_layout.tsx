import React from "react";
import { Stack, useRouter } from "expo-router";

import { useAppSelector } from "@/src/Redux/Hooks/Config";
import HeaderIcon from "@/src/Components/Navigation/HeaderIcon/HeaderIcon";
import { light, dark } from "@/src/Theme/Colors";
import { family } from "@/src/Theme/Font";
import StackWrapper from "@/src/HOCs/StackWrapper";

const ManagerUpdateLayout = () => {
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
        name="index"
        options={{
          headerTitle: "Update Options",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="contacts"
        options={{
          headerTitle: "Update Contacts",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          headerTitle: "Update Account Details",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="picture"
        options={{
          headerTitle: "Update Profile Picture",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};

export default StackWrapper(ManagerUpdateLayout);
