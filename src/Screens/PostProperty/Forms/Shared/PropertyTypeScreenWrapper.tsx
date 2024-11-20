import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { SCREEN_BREAK_POINT, MAX_INPUT_WIDTH } from "@/src/Utils/Constants";

type Props = {
  children: React.ReactNode;
};

const PropertyTypeScreenWrapper: React.FC<Props> = ({ children }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewStyle}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.inputWrapper,
            { width: width > SCREEN_BREAK_POINT ? MAX_INPUT_WIDTH : "95%" },
          ]}
        >
          {children}
        </View>
      </ScrollView>
    </View>
  );
};

export default PropertyTypeScreenWrapper;

const styles = StyleSheet.create({
  container: { width: "100%", alignItems: "center" },
  scrollViewStyle: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  inputWrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    gap: 12,
  },
});
