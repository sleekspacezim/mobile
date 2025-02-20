import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { gray } from "@/src/Theme/Colors";
import { SCREEN_BREAK_POINT } from "@/src/Utils/Constants";

const SafetyHint = () => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Row style={styles.headerContainer}>
        <MaterialCommunityIcons name="lightbulb-on" size={24} color="orange" />
        <ThemedText type="regular">Safety Hint!</ThemedText>
      </Row>
      <Row style={styles.hintContainer}>
        <Entypo name="dot-single" size={24} color={gray} />
        <ThemedText
          type="regular"
          styles={{ maxWidth: width > SCREEN_BREAK_POINT ? "90%" : "85%" }}
        >
          Please make sure you verify the title deeds and other neccessary
          property documents before money is exchanged.
        </ThemedText>
      </Row>
      <Row style={styles.hintContainer}>
        <Entypo name="dot-single" size={24} color={gray} />
        <ThemedText
          type="regular"
          styles={{ maxWidth: width > SCREEN_BREAK_POINT ? "100%" : "85%" }}
        >
          If you get scammed Sleek Space will not be liable in any way.
        </ThemedText>
      </Row>
    </View>
  );
};

export default SafetyHint;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    borderWidth: 1,
    borderColor: gray,
    borderRadius: 10,
    padding: 7,
    width: "100%",
  },
  headerContainer: {
    gap: 5,
    alignItems: "center",
  },
  hintContainer: {
    alignItems: "flex-start",
    gap: 5,
  },
});
