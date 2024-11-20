import { StyleSheet, useWindowDimensions, View } from "react-native";
import React from "react";

import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import Screen from "@/src/Components/ScreenWrapper/Screen";
import SkeletonLoader from "@/src/Components/SkeletonLoader/SkeletonLoader";
import {
  BUTTON_SIZE_SCREEN_BREAK_POINT,
  BUTTON_MAX_WIDTH,
  SCREEN_BREAK_POINT,
} from "@/src/Utils/Constants";

const ManagerLoader: INoPropsReactComponent = () => {
  const { width } = useWindowDimensions();
  return (
    <Screen>
      <View style={styles.container}>
        <SkeletonLoader style={styles.image} />
        <View style={styles.nameAndEmail}>
          <SkeletonLoader style={{ width: 200, height: 20, borderRadius: 7 }} />
          <SkeletonLoader style={{ width: 150, height: 20, borderRadius: 7 }} />
        </View>
        <View
          style={[
            styles.details,
            { width: width > SCREEN_BREAK_POINT ? 600 : "100%" },
          ]}
        >
          <View style={styles.options}>
            <SkeletonLoader
              style={{ width: 70, height: 20, borderRadius: 7 }}
            />
            <SkeletonLoader
              style={{ width: 40, height: 20, borderRadius: 7 }}
            />
          </View>
          <View style={styles.detailsInfo}>
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
            <SkeletonLoader
              style={{ width: "100%", height: 45, borderRadius: 7 }}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default ManagerLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  image: {
    height: 140,
    width: 140,
    borderRadius: 70,
  },
  nameAndEmail: {
    flexDirection: "column",
    gap: 5,
    alignItems: "center",
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
  detailsInfo: {
    gap: 10,
    width: "100%",
    alignItems: "center",
    flex: 1,
  },
  btns: {
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 20,
    marginTop: 40,
  },
});
