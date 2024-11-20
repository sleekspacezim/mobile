import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";

import Screen from "@/src/Components/ScreenWrapper/Screen";
import SkeletonLoader from "@/src/Components/SkeletonLoader/SkeletonLoader";
import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import {
  BUTTON_MAX_WIDTH,
  BUTTON_SIZE_SCREEN_BREAK_POINT,
  SCREEN_BREAK_POINT,
} from "@/src/Utils/Constants";

const LoadingSkeleton: INoPropsReactComponent = () => {
  const { width } = useWindowDimensions();
  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.container}>
          <View
            style={[
              styles.details,
              { width: width > SCREEN_BREAK_POINT ? 600 : "100%" },
            ]}
          >
            <View style={styles.options}>
              <SkeletonLoader
                style={{ width: "40%", height: 45, borderRadius: 7 }}
              />
              <SkeletonLoader
                style={{ width: "40%", height: 45, borderRadius: 7 }}
              />
            </View>
            <SkeletonLoader
              style={{ width: "100%", height: 45, borderRadius: 7 }}
            />
            <SkeletonLoader
              style={{ width: "100%", height: 45, borderRadius: 7 }}
            />
            <SkeletonLoader
              style={{ width: "100%", height: 45, borderRadius: 7 }}
            />
            <SkeletonLoader
              style={{ width: "100%", height: 45, borderRadius: 7 }}
            />
            <SkeletonLoader
              style={{ width: "100%", height: 45, borderRadius: 7 }}
            />
            <SkeletonLoader
              style={{ width: "100%", height: 45, borderRadius: 7 }}
            />
          </View>
          <View
            style={[
              styles.btns,
              {
                width:
                  width > BUTTON_SIZE_SCREEN_BREAK_POINT
                    ? BUTTON_MAX_WIDTH
                    : "100%",
              },
            ]}
          >
            <SkeletonLoader
              style={{ width: "100%", height: 45, borderRadius: 7 }}
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default LoadingSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    marginTop: 20,
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  details: {
    gap: 10,
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 10,
  },
  btns: {
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 20,
    marginTop: 40,
    paddingHorizontal: 10,
  },
});
