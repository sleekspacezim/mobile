import React, { useCallback } from "react";
import { useSharedValue, withSpring } from "react-native-reanimated";

import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import PropertyCardOptions from "./PropertyCardOptions/PropertyCardOptions";
import BottomSheetAnimationWrapper from "../BottomSheetAnimationWrapper";
import { useBottomSheetsContext } from "@/src/Context/BottomSheetsContext";

const PropertyCardBottomSheet: INoPropsReactComponent = () => {
  const translateY = useSharedValue(1);
  const initialBottomSheetHeight = -160;
  const { setIsPropertyCardBottomSheetOpen } = useBottomSheetsContext();

  const scrollTo = useCallback((destination: number) => {
    "worklet";
    translateY.value = withSpring(destination, { damping: 50 });
  }, []);

  const closeBottomSheetWithoutScrollingToTheBottom = () => {
    scrollTo(0);
    setTimeout(() => {
      setIsPropertyCardBottomSheetOpen(false);
    }, 300);
  };
  
  return (
    <BottomSheetAnimationWrapper
      initialBottomSheetHeight={initialBottomSheetHeight}
      translateY={translateY}
      scrollTo={scrollTo}
      closeBottomSheet={() => setIsPropertyCardBottomSheetOpen(false)}
      closeBottomSheetWithoutScrollingToTheBottom={
        closeBottomSheetWithoutScrollingToTheBottom
      }
    >
      <PropertyCardOptions
        closeBottomSheetWithoutScrollingToTheBottom={
          closeBottomSheetWithoutScrollingToTheBottom
        }
      />
    </BottomSheetAnimationWrapper>
  );
};

export default PropertyCardBottomSheet;
