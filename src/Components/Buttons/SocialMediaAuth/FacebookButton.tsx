import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";

import { family, small } from "@/src/Theme/Font";
import { white } from "@/src/Theme/Colors";
import FaceBookLogoSVG from "./Logos/FaceBookLogoSVG";
import { IVoidFunc } from "@/src/GlobalTypes/Types";

type Props = {
  type: "sign_in" | "sign_up";
  disabled: boolean;
  handleOnPressFunc: IVoidFunc;
};

WebBrowser.maybeCompleteAuthSession();

const FacebookButton: React.FC<Props> = ({
  type,
  disabled,
  handleOnPressFunc,
}) => {
  return (
    <Pressable
      style={styles.container}
      disabled={disabled}
      onPress={handleOnPressFunc}
    >
      <FaceBookLogoSVG />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {type === "sign_in"
            ? "Login with Facebook"
            : "Register with Facebook"}
        </Text>
      </View>
    </Pressable>
  );
};

export default FacebookButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 7,
    backgroundColor: "#3B5998",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -20,
    flex: 1,
  },
  text: {
    fontFamily: family,
    fontSize: small,
    color: white,
  },
});
