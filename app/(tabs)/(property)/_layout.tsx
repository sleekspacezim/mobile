import React from "react";
import { Stack, useRouter } from "expo-router";

import { useAppSelector } from "@/src/Redux/Hooks/Config";
import StackWrapper from "@/src/HOCs/StackWrapper";
import { family } from "@/src/Theme/Font";
import HeaderIcon from "@/src/Components/Navigation/HeaderIcon/HeaderIcon";
import { light, dark } from "@/src/Theme/Colors";

const PropertyLayout = () => {
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
      <Stack.Screen name="property/[id]" options={{ headerTitle:"Property", headerTitleAlign:"center" }} />
      <Stack.Screen
        name="property/update/[id]"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default StackWrapper(PropertyLayout);
