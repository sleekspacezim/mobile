import { StyleSheet, Text } from "react-native";
import React from "react";

import CustomTouchableHighlight from "../../CustomTouchableHighlight/CustomTouchableHighlight";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { dark, gray, light, primary, pureWhite } from "@/src/Theme/Colors";
import { family, small } from "@/src/Theme/Font";

type Props = {
  type: IPropertyType;
  isHighlighted: boolean;
  onPressFunc: IVoidFunc;
};

const PropertyType: React.FC<Props> = ({
  type,
  isHighlighted,
  onPressFunc,
}) => {
  const theme = useAppSelector((state) => state.theme.value);
  return (
    <CustomTouchableHighlight
      onPressFunc={onPressFunc}
      styles={[
        styles.container,
        {
          borderBottomColor: isHighlighted
            ? primary
            : theme === "light"
            ? pureWhite
            : dark.background,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: isHighlighted
              ? theme === "light"
                ? light.text
                : dark.text
              : gray,
          },
        ]}
      >
        {type}
      </Text>
    </CustomTouchableHighlight>
  );
};

export default PropertyType;

const styles = StyleSheet.create({
  container: {
    minHeight: 40,
    borderRadius: 5,
    paddingHorizontal: 5,
    marginHorizontal: 8,
    justifyContent: "flex-end",
    alignItems: "center",
    minWidth: 60,
    borderBottomWidth: 3,
  },
  text: {
    fontFamily: family,
    fontSize:small,
  },
});
