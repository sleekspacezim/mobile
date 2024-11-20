import React, { useEffect } from "react";
import { Animated, ViewStyle } from "react-native";

import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { dark } from "@/src/Theme/Colors";

type Props = {
  style?: ViewStyle;
};

const SkeletonLoader: React.FC<Props> = ({ style }) => {
  const animatedValue = new Animated.Value(0);
  const theme = useAppSelector((state) => state.theme.value);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  });

  const colors = () => {
    if (theme === "light") return ["#e0e0e0", "#f0f0f0"];
    else return ["#303030", dark.darkGray];
  };

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: colors(),
  });

  return <Animated.View style={[style, { backgroundColor }]} />;
};

export default SkeletonLoader;
