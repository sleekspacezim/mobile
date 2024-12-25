import { StyleSheet, View } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import RegularText from "@/src/Components/RegularText/RegularText";
import Row from "@/src/Components/Row/Row";
import { primary } from "@/src/Theme/Colors";
import { useAppSelector } from "@/src/Redux/Hooks/Config";

type Props = {
  totalProperties: number;
};

const TotalProperties: React.FC<Props> = ({ totalProperties }) => {
  const activePropertyType = useAppSelector(
    (state) => state.activePropertyType.value
  );
  return (
    <View style={styles.container}>
      <Row style={styles.row}>
        {(activePropertyType === "Residential Rentals" ||
          activePropertyType === "Residential ForSale") && (
          <MaterialIcons name="home" size={24} color={primary} />
        )}
        {(activePropertyType === "Commercial Rentals" ||
          activePropertyType === "Commercial ForSale") && (
          <FontAwesome name="building" size={24} color={primary} />
        )}
        {activePropertyType === "Land" && (
          <MaterialIcons name="landscape" size={24} color={primary} />
        )}
        {activePropertyType === "Stands" && (
          <FontAwesome5 name="inbox" size={24} color={primary} />
        )}

        <View style={{ position: "absolute", left: 30, top: 5 }}>
          <RegularText>{`${totalProperties} avaliable properties`}</RegularText>
        </View>
      </Row>
    </View>
  );
};

export default TotalProperties;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 7,
    position: "relative",
  },
  row: {
    gap: 5,
    alignItems: "flex-end",
  },
});
