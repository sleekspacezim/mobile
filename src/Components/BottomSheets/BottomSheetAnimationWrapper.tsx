import React, { useEffect } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { pureWhite, dark, gray } from "@/src/Theme/Colors";

type Props = {
  initialBottomSheetHeight: number;
  children: React.ReactElement;
  translateY: SharedValue<number>;
  scrollTo: (destination: number) => void;
  closeBottomSheet: IVoidFunc;
  closeBottomSheetWithoutScrollingToTheBottom: () => void
};

const BottomSheetAnimationWrapper: React.FC<Props> = ({
  initialBottomSheetHeight,
  children,
  translateY,
  scrollTo,
  closeBottomSheet,
  closeBottomSheetWithoutScrollingToTheBottom
}) => {
  const theme = useAppSelector((state) => state.theme.value);
  const { height } = useWindowDimensions();

  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, initialBottomSheetHeight);
    })
    .onEnd(() => {
      if (translateY.value > initialBottomSheetHeight / 2) {
        scrollTo(0);
        runOnJS(closeBottomSheet)();
      } else scrollTo(initialBottomSheetHeight);
    });

  useEffect(() => {
    scrollTo(initialBottomSheetHeight);
  }, []);

  const transformStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme === "light" ? "#000000b3" : "#1b1b1cb3",
        },
      ]}
      onTouchEnd={closeBottomSheetWithoutScrollingToTheBottom}
    >
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.bottomSheet,
            transformStyle,
            {
              backgroundColor: theme === "light" ? pureWhite : dark.darkGray,
              top: height,
              height: height,
            },
          ]}
          onStartShouldSetResponder={(event) => true}
          onTouchEnd={(e) => {
            e.stopPropagation();
          }}
        >
          <View style={styles.sheetHeader}>
            <View
              style={[
                styles.dragHandle,
                {
                  backgroundColor: theme === "light" ? "#ccc" : gray,
                },
              ]}
            />
          </View>
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default BottomSheetAnimationWrapper;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    padding: 5,
  },
  sheetHeader: {
    alignItems: "center",
  },
  dragHandle: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    marginVertical: 10,
  },
  sheetContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
