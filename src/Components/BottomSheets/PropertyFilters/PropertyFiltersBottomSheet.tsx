import React, { useCallback } from "react";
import { useSharedValue, withSpring } from "react-native-reanimated";

import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import { useBottomSheetsContext } from "@/src/Context/BottomSheetsContext";
import BottomSheetAnimationWrapper from "../BottomSheetAnimationWrapper";
import SharedRoomsFilter from "./Content/SharedRoomsFilter";
import CurrencyFilter from "./Content/CurrencyFilter";
import PropertyStructureTypeFilter from "./Content/PropertyStructureTypeFilter";

const PropertyFiltersBottomSheet: INoPropsReactComponent = () => {
  const translateY = useSharedValue(1);
  const initialBottomSheetHeight = -200;
  const { propertyFiltersBottomSheet, setPropertyFiltersBottomSheet } =
    useBottomSheetsContext();

  const scrollTo = useCallback((destination: number) => {
    "worklet";
    translateY.value = withSpring(destination, { damping: 50 });
  }, []);

  const closeBottomSheetWithoutScrollingToTheBottom = () => {
    setTimeout(() => {
      setPropertyFiltersBottomSheet("");
    }, 300);
    scrollTo(0);
  };

  const filterComponent = () => {
    if (propertyFiltersBottomSheet === "Currency")
      return (
        <CurrencyFilter
          closeBottomSheet={closeBottomSheetWithoutScrollingToTheBottom}
        />
      );
    else if (propertyFiltersBottomSheet === "Type")
      return (
        <PropertyStructureTypeFilter
          closeBottomSheet={closeBottomSheetWithoutScrollingToTheBottom}
        />
      );
    else
      return (
        <SharedRoomsFilter
          filterType={propertyFiltersBottomSheet}
          closeBottomSheet={closeBottomSheetWithoutScrollingToTheBottom}
        />
      );
  };

  return (
    <BottomSheetAnimationWrapper
      initialBottomSheetHeight={
        propertyFiltersBottomSheet === "Currency"
          ? -145
          : propertyFiltersBottomSheet === "Type"
          ? -330
          : initialBottomSheetHeight
      }
      translateY={translateY}
      scrollTo={scrollTo}
      closeBottomSheet={() => {
        setPropertyFiltersBottomSheet("");
      }}
      closeBottomSheetWithoutScrollingToTheBottom={
        closeBottomSheetWithoutScrollingToTheBottom
      }
    >
      {filterComponent()}
    </BottomSheetAnimationWrapper>
  );
};

export default PropertyFiltersBottomSheet;
