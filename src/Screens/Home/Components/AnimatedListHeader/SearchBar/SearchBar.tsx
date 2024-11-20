import { Pressable, StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { gray, primary } from "@/src/Theme/Colors";
import RegularText from "@/src/Components/RegularText/RegularText";
import Row from "@/src/Components/Row/Row";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { SCREEN_BREAK_POINT } from "@/src/Utils/Constants";

type Props = {
  onPressFunc: IVoidFunc;
};

const SearchBar: React.FC<Props> = ({ onPressFunc }) => {
  const { width } = useWindowDimensions();
  return (
    <Pressable
      style={[
        styles.container,
        {
          width: width > SCREEN_BREAK_POINT ? 500 : "95%",
          alignSelf: width > SCREEN_BREAK_POINT ? "flex-start" : "center",
          marginLeft:width > SCREEN_BREAK_POINT ? 5:0
        },
      ]}
      onPress={onPressFunc}
    >
      <Row style={styles.row}>
        <Feather name="search" size={24} color={primary} />
        <RegularText>Search location</RegularText>
      </Row>
      <MaterialIcons name="location-on" size={24} color={gray} />
    </Pressable>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: gray,
    borderRadius: 7,
    flexDirection: "row",
    height: 45,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  row: {
    gap: 8,
    alignItems: "center",
  },
});
