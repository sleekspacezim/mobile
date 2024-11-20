import { StyleSheet, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { green, red, white } from "@/src/Theme/Colors";
import CustomButton from "../Buttons/Custom/CustomButton";
import RegularText from "../RegularText/RegularText";
import Row from "../Row/Row";

type Props = {
  retryFunc: IVoidFunc;
};

const FlatListOnEndReachedError: React.FC<Props> = ({
  retryFunc,
}) => {
  return (
    <View style={styles.container}>
        <Row style={styles.rowStyles}>
          <Ionicons name="warning-outline" size={24} color={red} />
          <RegularText style={{ textAlign: "center" }}>
            Failed to load more properties
          </RegularText>
        </Row>
      <CustomButton
        title="retry"
        onPressFunc={retryFunc}
        color={green}
        iconPosition="left"
        icon={<Ionicons name="reload" size={20} color={white} />}
      />
    </View>
  );
};

export default FlatListOnEndReachedError;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 10,
    alignItems: "center",
    width:"100%"
  },
  rowStyles: { gap: 6, alignItems: "flex-end" },
});
