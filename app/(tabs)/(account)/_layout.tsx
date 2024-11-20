import React from "react";
import { Stack, useRouter } from "expo-router";

import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { dark, light } from "@/src/Theme/Colors";
import { family } from "@/src/Theme/Font";
import HeaderIcon from "@/src/Components/Navigation/HeaderIcon/HeaderIcon";
import StackWrapper from "@/src/HOCs/StackWrapper";

const AccountLayout = () => {
  const theme = useAppSelector((state) => state.theme.value);
  const route = useRouter();
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          color: theme === "light" ? light.text : dark.text,
          fontFamily:family
        },
        headerLeft: () => (
          <HeaderIcon iconName="arrow-back" onPressFunc={() => route.back()} />
        ),
        headerTransparent:true
      }}
    >
      <Stack.Screen name="account/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="account/history"
        options={{
          headerTitle: "History",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="account/legals"
        options={{
          headerTitle: "Legalities",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="account/(manager)"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="account/notifications"
        options={{
          headerTitle: "Notifications",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="account/payments"
        options={{
          headerTitle: "Billing&Payments",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="account/(profile)"
        options={{
          headerShown:false
        }}
      />
      <Stack.Screen
        name="account/support"
        options={{
          headerTitle: "Help&Support",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="account/theme"
        options={{
          headerTitle: "Theme",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="account/termsAndconditions"
        options={{
          headerTitle: "Terms&Conditions",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};

export default StackWrapper(AccountLayout);
