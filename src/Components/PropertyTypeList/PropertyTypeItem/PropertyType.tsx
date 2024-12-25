import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

import { dark, lightGray, pureWhite, white } from "@/src/Theme/Colors";
import { useAppDispatch, useAppSelector } from "@/src/Redux/Hooks/Config";
import { activeOpacityOfTouchableOpacity } from "@/src/Utils/Constants";
import { family, small } from "@/src/Theme/Font";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { setActivePropertyType } from "@/src/Redux/Slices/ActivePropertyTypeSlice/ActiveProperty";

type Props = {
  propertyType: IPropertyType;
  onPressFlatListScrollFunc: IVoidFunc;
};

const PropertyTypeItem: React.FC<Props> = ({
  propertyType,
  onPressFlatListScrollFunc,
}) => {
  const activePropertyType = useAppSelector(
    (state) => state.activePropertyType.value
  );
  const theme = useAppSelector((state) => state.theme.value);
  const dispatch = useAppDispatch();
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setActivePropertyType(propertyType));
        onPressFlatListScrollFunc();
      }}
      activeOpacity={activeOpacityOfTouchableOpacity}
      style={[
        styles.container,
        {
          marginRight: propertyType === "Land" ? 5 : 0,
          backgroundColor:
            activePropertyType === propertyType
              ? theme === "dark"
                ? pureWhite
                : dark.background
              : theme === "dark"
              ? dark.darkGray
              : lightGray,
        },
      ]}
    >
      <Text
        style={[
          styles.textStyle,
          {
            color:
              activePropertyType === propertyType
                ? theme === "dark"
                  ? dark.background
                  : white
                : theme === "dark"
                ? white
                : dark.background,
          },
        ]}
      >
        {propertyType}
      </Text>
    </TouchableOpacity>
  );
};

export default PropertyTypeItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginLeft: 5,
  },
  textStyle: {
    fontFamily: family,
    fontSize: small,
    marginTop: 3,
  },
});
