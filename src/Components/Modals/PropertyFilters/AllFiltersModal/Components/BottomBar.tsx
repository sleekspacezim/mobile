import { StyleSheet, useWindowDimensions, View } from "react-native";
import React from "react";

import { IVoidFunc } from "@/src/GlobalTypes/Types";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import OutlinedButton from "@/src/Components/Buttons/Outlined/OutlinedButton";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { dark, lightGray } from "@/src/Theme/Colors";
import { SCREEN_BREAK_POINT } from "@/src/Utils/Constants";

type Props = {
  resetFiltersFunc: IVoidFunc;
  applyFiltersFunc: IVoidFunc;
};

const BottomBar: React.FC<Props> = ({ resetFiltersFunc, applyFiltersFunc }) => {
  const theme = useAppSelector((state) => state.theme.value);
  const { width } = useWindowDimensions();
  return (
    <View
      style={[
        styles.container,
        { borderTopColor: theme === "dark" ? dark.darkGray : lightGray },
      ]}
    >
      <View
        style={[
          styles.btnContainer,
          { width: width < SCREEN_BREAK_POINT ? "100%" : 400 },
        ]}
      >
        <OutlinedButton
          title="Reset"
          onPressFunc={resetFiltersFunc}
          width={100}
          height={45}
        />
        <View style={{ flex: 1 }}>
          <CustomButton
            title="Apply"
            onPressFunc={applyFiltersFunc}
            height={45}
          />
        </View>
      </View>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 12,
    paddingBottom: 5,
    borderTopWidth: 2,
  },
  btnContainer: {
    flexDirection: "row",
    gap: 10,
  },
});
