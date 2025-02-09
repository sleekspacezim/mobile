import { View } from "react-native";
import React from "react";
import {
  Entypo,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import Row from "@/src/Components/Row/Row";
import RegularText from "@/src/Components/RegularText/RegularText";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { gray, primary } from "@/src/Theme/Colors";
import Divider from "../Divider/Divider";
import Heading from "../Heading/Heading";

type Props = {
  features: string[];
  type: "Exterior" | "Interior";
};

const ExteriorInteriorFeatures: React.FC<Props> = ({ features, type }) => {
  return (
    <View style={{ gap: 10 }}>
      <Heading
        title={
          type === "Exterior"
            ? "Other Exterior features"
            : "Other Interior Features"
        }
        icon={
          type === "Exterior" ? (
            <MaterialIcons name="yard" size={26} color={primary} />
          ) : (
            <FontAwesome6 name="kitchen-set" size={26} color={primary} />
          )
        }
      />
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
