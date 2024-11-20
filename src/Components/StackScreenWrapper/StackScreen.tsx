import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { useAppSelector } from "@/src/Redux/Hooks/Config";

type Props = {
  children: React.ReactNode;
};

const StackScreen: React.FC<Props> = ({ children }) => {
  const theme = useAppSelector((state) => state.theme.value);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <View style={styles.header} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <View style={{ height: "100%" }}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StackScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 50,
  },
  scrollViewContainer: {
    paddingTop: 10,
    flexGrow: 1,
  },
});
