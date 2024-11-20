import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";

import PropertyTypeList from "@/src/Components/PropertyTypeList/PropertyTypeList";
import { animatedHeaderHeight } from "../../Utils/Constants";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { dark, gray, pureWhite } from "@/src/Theme/Colors";
import { SCREEN_BREAK_POINT } from "@/src/Utils/Constants";
import SearchBar from "./SearchBar/SearchBar";
import Filters from "./Filters/Filters";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import TotalProperties from "./TotalProperties/TotalProperties";

type Props = {
  activePropertyType: IPropertyType;
  totalProperties: number;
  scrollAnimation: Animated.Value;
  setActivePropertyType: React.Dispatch<React.SetStateAction<IPropertyType>>;
};

const AnimatedListHeader: React.FC<Props> = ({
  activePropertyType,
  totalProperties,
  scrollAnimation,
  setActivePropertyType,
}) => {
  const [openSearchModal, setOpenSearchModal] = useState<boolean>(false);
  const theme = useAppSelector((state) => state.theme.value);
  const { width } = useWindowDimensions();
  const [offsetAnimation] = useState(new Animated.Value(0));
  const [clampedScroll, setClampedScroll] = useState(
    Animated.diffClamp(
      Animated.add(
        scrollAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: "clamp",
        }),
        offsetAnimation
      ),
      0,
      1
    )
  );

  const navBarTranslate = clampedScroll.interpolate({
    inputRange: [0, animatedHeaderHeight],
    outputRange: [0, -animatedHeaderHeight],
    extrapolate: "clamp",
  });

  const onLayout = (event: LayoutChangeEvent) => {
    let { height } = event.nativeEvent.layout;
    setClampedScroll(
      Animated.diffClamp(
        Animated.add(
          scrollAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: "clamp",
          }),
          offsetAnimation
        ),
        0,
        height
      )
    );
  };

  return (
    <>
      {width > SCREEN_BREAK_POINT ? (
        <View style={styles.tabletContainer}>
          <SearchBar onPressFunc={() => setOpenSearchModal(true)} />
          <PropertyTypeList
            activePropertyType={activePropertyType}
            setActivePropertyType={setActivePropertyType}
          />
          <Filters propertyType={activePropertyType} />
          <TotalProperties
            totalProperties={totalProperties}
            activePropertyType={activePropertyType}
          />
        </View>
      ) : (
        <Animated.View
          style={[
            styles.container,
            {
              height: animatedHeaderHeight,
              backgroundColor: theme === "dark" ? dark.background : pureWhite,
              transform: [{ translateY: navBarTranslate }],
            },
          ]}
          onLayout={onLayout}
        >
          <SearchBar onPressFunc={() => setOpenSearchModal(true)} />
          <PropertyTypeList
            activePropertyType={activePropertyType}
            setActivePropertyType={setActivePropertyType}
          />
          <Filters propertyType={activePropertyType} />
          <TotalProperties
            totalProperties={totalProperties}
            activePropertyType={activePropertyType}
          />
        </Animated.View>
      )}
    </>
  );
};

export default AnimatedListHeader;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    gap: 10,
  },
  tabletContainer: {
    gap: 10,
  },
  sortOrMap: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: gray,
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 2,
  },
});
