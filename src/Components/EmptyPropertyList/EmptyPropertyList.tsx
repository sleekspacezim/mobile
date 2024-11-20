import { ScrollView, StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import React from "react";

import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import house from "@/src/Components/Lotties/house.json";
import ThemedText from "../ThemedText/ThemedText";
import RegularText from "../RegularText/RegularText";

type Props = {
  text: string;
};

const EmptyPropertyList: React.FC<Props> = ({ text }) => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View>
          <LottieView
            source={house}
            autoPlay
            loop
            style={{
              height: 310,
              width: 310,
            }}
          />
        </View>
        <View style={styles.textContainer}>
        <ThemedText type="header">No properties available.</ThemedText>
        <RegularText>{text}</RegularText>
        </View>
      </View>
    </ScrollView>
  );
};

export default EmptyPropertyList;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingHorizontal: 20,
    marginBottom:10
  },
  textContainer:{
    width:"100%",
    gap:5,
  }
});
