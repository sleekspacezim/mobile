import { StyleSheet, View } from "react-native";
import React from "react";

import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { gray } from "@/src/Theme/Colors";

type Props = {
  title: string;
  icon: React.ReactNode;
};

const Heading: React.FC<Props> = ({ title, icon }) => {
  return (
    <Row style={styles.container}>
      {icon}
      <View>
        <ThemedText type="header" styles={{ fontStyle: "italic" }}>
          {title}
        </ThemedText>
        <View style={styles.line} />
      </View>
    </Row>
  );
};

export default Heading;

const styles = StyleSheet.create({
  container: { gap: 5, alignItems: "center" },
  line: { borderBottomColor: gray, borderBottomWidth: 1, marginTop: -2 },
});
