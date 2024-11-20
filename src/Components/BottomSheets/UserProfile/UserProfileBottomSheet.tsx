import React, { useCallback } from "react";
import { useSharedValue, withSpring } from "react-native-reanimated";

import { useBottomSheetsContext } from "@/src/Context/BottomSheetsContext";
import BottomSheetAnimationWrapper from "../BottomSheetAnimationWrapper";
import ProfileContent from "./Contents/ProfileContent";

const UserProfileBottomSheet: React.FC = () => {
  const translateY = useSharedValue(1);
  const initialBottomSheetHeight = -200;
  const { setIsUserProfileBottomSheetOpen } = useBottomSheetsContext();

  const scrollTo = useCallback((destination: number) => {
    "worklet";
    translateY.value = withSpring(destination, { damping: 50 });
  }, []);

  const closeBottomSheetWithoutScrollingToTheBottom = () => {
    scrollTo(0);
    setTimeout(() => {
      setIsUserProfileBottomSheetOpen(false);
    }, 300);
  };

  return (
    <BottomSheetAnimationWrapper
      initialBottomSheetHeight={initialBottomSheetHeight}
      closeBottomSheet={() => setIsUserProfileBottomSheetOpen(false)}
      translateY={translateY}
      scrollTo={scrollTo}
      closeBottomSheetWithoutScrollingToTheBottom={
        closeBottomSheetWithoutScrollingToTheBottom
      }
    >
      <ProfileContent
        closeBottomSheetFunc={() => setIsUserProfileBottomSheetOpen(false)}
        closeBottomSheetWithoutScrollingToTheBottom={
          closeBottomSheetWithoutScrollingToTheBottom
        }
      />
    </BottomSheetAnimationWrapper>
  );
};

export default UserProfileBottomSheet;
