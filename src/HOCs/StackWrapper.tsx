import { View, StyleSheet } from "react-native";
import React from "react";

import { useAppSelector } from "../Redux/Hooks/Config";
import { light, dark } from "../Theme/Colors";

const StackWrapper = (Stack: React.FC) => {
  const useStackWrapper = (props: any) => {
    const theme = useAppSelector((state) => state.theme.value);
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              theme === "light" ? light.background : dark.background,
          },
        ]}
      >
        <Stack {...props} />
      </View>
    );
  };
  return useStackWrapper;
};

export default StackWrapper;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
