import { StyleSheet, View } from "react-native";
import React from "react";

import { IVoidFunc } from "@/src/GlobalTypes/Types";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import OutlinedButton from "@/src/Components/Buttons/Outlined/OutlinedButton";
import Row from "@/src/Components/Row/Row";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { dark, lightGray } from "@/src/Theme/Colors";

type Props = {
  resetFiltersFunc: IVoidFunc;
  applyFiltersFunc: IVoidFunc;
};

const BottomBar: React.FC<Props> = ({ resetFiltersFunc, applyFiltersFunc }) => {
  const theme = useAppSelector((state) => state.theme.value);
  return (
    <View
      style={[
        styles.container,
        { borderTopColor: theme === "dark" ? dark.darkGray : lightGray },
      ]}
    >
      <Row style={styles.btnContainer}>
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
      </Row>
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
    width: "100%",
    gap: 10,
  },
});
