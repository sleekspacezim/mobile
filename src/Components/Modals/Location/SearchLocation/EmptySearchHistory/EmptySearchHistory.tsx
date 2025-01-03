import { StyleSheet, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import empty from "@/src/Components/Lotties/empty.json";
import RegularText from "@/src/Components/RegularText/RegularText";
import ThemedText from "@/src/Components/ThemedText/ThemedText";

const EmptySearchHistory: INoPropsReactComponent = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={empty}
        autoPlay
        loop
        style={{
          height: 310,
          width: 310,
        }}
      />
      <View style={styles.emptySubContainer}>
        <ThemedText type="header">Empty Search History</ThemedText>
        <RegularText>
          Enter the location where you want a home from.
        </RegularText>
      </View>
    </View>
  );
};

export default EmptySearchHistory;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  emptySubContainer: {
    gap: 5,
    marginBottom: 15,
  },
});
