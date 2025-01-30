import { View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

import Row from "@/src/Components/Row/Row";
import RegularText from "@/src/Components/RegularText/RegularText";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { gray } from "@/src/Theme/Colors";
import Divider from "../Divider/Divider";

type Props = {
  features: string[];
  type: "Exterior" | "Interior";
};

const ExteriorInteriorFeatures: React.FC<Props> = ({ features, type }) => {
  return (
    <View style={{ gap: 10 }}>
      <ThemedText type="header">
        {type === "Exterior"
          ? "Other Exterior features"
          : "Other Interior Features"}
      </ThemedText>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          flexWrap: "wrap",
        }}
      >
        {features.map((feature: string) => (
          <Row key={feature} style={{ alignItems: "center", gap: 4 }}>
            <Entypo name="dot-single" size={24} color={gray} />
            <RegularText>{feature}</RegularText>
          </Row>
        ))}
      </View>
      <Divider />
    </View>
  );
};

export default ExteriorInteriorFeatures;
