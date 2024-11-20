import React from "react";
import { Stack, useRouter } from "expo-router";

import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { dark, light } from "@/src/Theme/Colors";
import { family } from "@/src/Theme/Font";
import HeaderIcon from "@/src/Components/Navigation/HeaderIcon/HeaderIcon";
import StackWrapper from "@/src/HOCs/StackWrapper";

const ProfileLayout = () => {
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
        name="profile/index"
        options={{
          headerTitle: "Profile",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="profile/contacts"
        options={{
          headerTitle: "Contacts",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="profile/location"
        options={{
          headerTitle: "Location",
          headerTitleAlign: "center",
        }}
      />
        <Stack.Screen
          name="profile/picture"
          options={{
            headerTitle: "Profile Picture",
            headerTitleAlign: "center",
          }}
        />
      <Stack.Screen
        name="profile/update"
        options={{
          headerTitle: "Profile Updates",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};

export default StackWrapper(ProfileLayout);
