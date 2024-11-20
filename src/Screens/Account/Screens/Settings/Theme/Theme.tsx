import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/Redux/Hooks/Config";
import Screen from "@/src/Components/ScreenWrapper/Screen";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { switchTheme } from "@/src/Redux/Slices/Theme/Theme";
import { StatusBar } from "expo-status-bar";
import { saveSecureValue } from "@/src/Utils/Funcs";
import { expoSecureValueKeyNames } from "@/src/Utils/Constants";
import StackScreen from "@/src/Components/StackScreenWrapper/StackScreen";

type Props = {};

const Theme = (props: Props) => {
  const [value, setValue] = useState("light");
  const theme = useAppSelector((state) => state.theme.value);
  const dispatch = useAppDispatch();
  const toggleTheme = () => {
    saveSecureValue(
      expoSecureValueKeyNames.theme,
      theme === "light" ? "dark" : "light"
    )
      .then(() => {
        dispatch(switchTheme(theme === "light" ? "dark" : "light"));
      })
      .catch((e) => {
        console.log("e", e);
      });
  };
  return (
    <Screen>
      <StackScreen>
        {/* <StatusBar style={theme === "light" ? "dark" : "light"} /> */}
        <ThemedText type="regular">Theme</ThemedText>
        <TouchableOpacity onPress={toggleTheme}>
          <ThemedText type="regular">Theme</ThemedText>
        </TouchableOpacity>
      </StackScreen>
    </Screen>
  );
};

export default Theme;

const styles = StyleSheet.create({});
