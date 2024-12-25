import { StyleSheet, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

import { IVoidFunc } from "@/src/GlobalTypes/Types";
import CustomTouchableHighlight from "@/src/Components/CustomTouchableHighlight/CustomTouchableHighlight";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { dark, lightGray, pureWhite } from "@/src/Theme/Colors";
import { useAppSelector } from "@/src/Redux/Hooks/Config";

type Props = {
  closeModal: IVoidFunc;
};

const TopBar: React.FC<Props> = ({ closeModal }) => {
  const theme = useAppSelector((state) => state.theme.value);
  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: theme === "dark" ? dark.darkGray : lightGray },
      ]}
    >
      <CustomTouchableHighlight
        onPressFunc={closeModal}
        styles={styles.closeIcon}
      >
        <AntDesign
          name="close"
          size={23}
          color={theme === "dark" ? pureWhite : dark.background}
        />
      </CustomTouchableHighlight>
      <ThemedText type="header" styles={{ marginTop: 6 }}>
        Filters
      </ThemedText>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderBottomWidth: 2,
  },
  closeIcon: {
    position: "absolute",
    left: 10,
    height: 36,
    width: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    top: -1,
  },
});
