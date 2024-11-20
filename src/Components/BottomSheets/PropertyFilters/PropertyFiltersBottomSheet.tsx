import React, { useCallback } from "react";
import { useSharedValue, withSpring } from "react-native-reanimated";

import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import { useBottomSheetsContext } from "@/src/Context/BottomSheetsContext";
import BottomSheetAnimationWrapper from "../BottomSheetAnimationWrapper";
import RentFilter from "./Content/Rent/RentFilter";

const PropertyFiltersBottomSheet: INoPropsReactComponent = () => {
  const translateY = useSharedValue(1);
  const initialBottomSheetHeight = -160;
  const {
    propertyFiltersBottomSheet,
    setPropertyFiltersBottomSheet
  } = useBottomSheetsContext();

  const scrollTo = useCallback((destination: number) => {
    "worklet";
    translateY.value = withSpring(destination, { damping: 50 });
  }, []);

  const closeBottomSheetWithoutScrollingToTheBottom = () => {
    scrollTo(0);
    setTimeout(() => {
      setPropertyFiltersBottomSheet({
        type: "All Filters",
        isOpen: false,
      });
    }, 300);
  };

  return (
    <BottomSheetAnimationWrapper
      initialBottomSheetHeight={initialBottomSheetHeight}
      translateY={translateY}
      scrollTo={scrollTo}
      closeBottomSheet={() => {
        setPropertyFiltersBottomSheet({
          type: "All Filters",
          isOpen: false,
        });
      }}
      closeBottomSheetWithoutScrollingToTheBottom={
        closeBottomSheetWithoutScrollingToTheBottom
      }
    >
      <RentFilter />
    </BottomSheetAnimationWrapper>
  );
};

export default PropertyFiltersBottomSheet;
