import { StyleSheet, View } from "react-native";
import React from "react";

import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import { dark, lightGray } from "@/src/Theme/Colors";

const Divider: INoPropsReactComponent = () => {
  const theme = useAppSelector((state) => state.theme.value);
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: theme === "dark" ? dark.darkGray : lightGray,
        },
      ]}
    />
  );
};

export default Divider;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomWidth: 1,
  },
});
