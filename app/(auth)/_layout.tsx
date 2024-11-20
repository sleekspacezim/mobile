import { useColorScheme } from "react-native";
import React from "react";
import { useRouter, Stack } from "expo-router";

import { family } from "@/src/Theme/Font";
import HeaderIcon from "@/src/Components/Navigation/HeaderIcon/HeaderIcon";
import { stackAnimation } from "@/src/Components/Navigation/Utils/Constants";
import { dark, light, pureWhite } from "@/src/Theme/Colors";
import StackWrapper from "@/src/HOCs/StackWrapper";
import { useAppSelector } from "@/src/Redux/Hooks/Config";

const AuthStack = () => {
  const router = useRouter();
  const theme = useAppSelector((state)=>state.theme.value)
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme === "light" ?pureWhite: "black" 
        },
        headerTitleStyle: {
          fontFamily: family,
          color: theme === "light" ? light.text : dark.text,
        },
        headerTitleAlign: "center",
        headerTransparent:true,
        headerLeft: () => (
          <HeaderIcon
            iconSize={24}
            iconName="arrow-back"
            onPressFunc={() => router.back()}
          />
        ),
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
          animation: stackAnimation,
          headerLeft: undefined,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Register",
          animation: stackAnimation,
        }}
      />
      <Stack.Screen
        name="verification/[id]"
        options={{
          title: "Verification",
        }}
      />
      <Stack.Screen
        name="forgotPassword"
        options={{
          title: "Forgot Password",
        }}
      />
      <Stack.Screen
        name="resetPassword/[id]"
        options={{
          title: "",
          headerStyle: {
            backgroundColor:
              theme === "light" ? light.background : dark.background,
          },
        }}
      />
    </Stack>
  );
};

export default StackWrapper(AuthStack);
