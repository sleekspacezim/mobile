import { StyleSheet, View } from "react-native";
import React from "react";

import { dark, pureWhite } from "@/src/Theme/Colors";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { StatusBar } from "expo-status-bar";

type Props = {
  children: React.ReactNode;
};

const Screen: React.FC<Props> = ({ children }) => {
  const theme = useAppSelector((state) => state.theme.value);
  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor:
            theme === "light" ? pureWhite : dark.background,
        },
      ]}
    >
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      {children}
    </View>
  );
};

export default Screen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
