import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import { family, medium } from "@/src/Theme/Font";

const AuthDivider: INoPropsReactComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.dividerLine}></View>
      <Text style={styles.text}>OR</Text>
      <View style={styles.dividerLine}></View>
    </View>
  );
};

export default AuthDivider;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical:5
  },
  dividerLine: {
    borderColor: "gray",
    borderBottomWidth: 1,
    width:"44%"
  },
  text: {
    fontFamily: family,
    fontSize: medium,
    color: "gray",
  },
});
