import { View, useWindowDimensions } from "react-native";
import React from "react";

import SkeletonLoader from "@/src/Components/SkeletonLoader/SkeletonLoader";
import { BUTTON_MAX_WIDTH, SCREEN_BREAK_POINT } from "@/src/Utils/Constants";

const Loader = () => {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const { width } = useWindowDimensions();
  return (
    <View style={{ gap: 10 }}>
      <SkeletonLoader style={{ width: "100%", height: 300, borderRadius: 7 }} />
      <View style={{ gap: 10, alignItems: "center", justifyContent: "center" }}>
        {list.map((item) => (
          <SkeletonLoader
            key={item}
            style={{
              width: width > SCREEN_BREAK_POINT ? BUTTON_MAX_WIDTH : "90%",
              height: 30,
              borderRadius: 7,
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default Loader;
