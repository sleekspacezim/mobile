import { StyleSheet } from "react-native";
import React from "react";

import RegularText from "@/src/Components/RegularText/RegularText";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { useAppSelector } from "@/src/Redux/Hooks/Config";

type Props = {
  postedTime: string;
  status: string;
};

const PostTimeAndStatus: React.FC<Props> = ({ postedTime, status }) => {
  const theme = useAppSelector((state) => state.theme.value);
  return (
    <Row style={styles.container}>
      <Row style={{ gap: 5 }}>
        <ThemedText type="regular" styles={{ fontStyle: "italic" }}>
          Posted:
        </ThemedText>
        <RegularText>{postedTime}</RegularText>
      </Row>
      {theme === "dark" ? (
        <ThemedText type="regular" styles={{ fontStyle: "italic" }}>
          {status}
        </ThemedText>
      ) : (
        <RegularText style={{ fontStyle: "italic" }}>{status}</RegularText>
      )}
    </Row>
  );
};

export default PostTimeAndStatus;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
  },
});
