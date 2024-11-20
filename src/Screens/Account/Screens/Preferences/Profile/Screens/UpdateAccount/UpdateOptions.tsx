import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import Screen from "@/src/Components/ScreenWrapper/Screen";
import StackScreen from "@/src/Components/StackScreenWrapper/StackScreen";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { gray } from "@/src/Theme/Colors";
import { SCREEN_BREAK_POINT } from "@/src/Utils/Constants";

const UpdateOptions: INoPropsReactComponent = () => {
  const iconSize = 18;
  const iconColor = gray;
  const { width } = useWindowDimensions();
  return (
    <Screen>
      <StackScreen>
        <View
          style={[
            styles.container,
            { width: width > SCREEN_BREAK_POINT ? 600 : "100%" },
          ]}
        >
          <TouchableOpacity
            style={styles.pressable}
            onPress={() => router.push("/account/profile/contacts")}
          >
            <Row style={styles.row}>
              <MaterialCommunityIcons
                name="contacts-outline"
                size={22}
                color={gray}
              />
              <ThemedText type="regular">Contacts</ThemedText>
            </Row>
            <AntDesign name="right" size={iconSize} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pressable]}
            onPress={() => router.push("/account/profile/location")}
          >
            <Row style={styles.row}>
              <Ionicons
                name="location-outline"
                size={22}
                color={gray}
              />
              <ThemedText type="regular">Location</ThemedText>
            </Row>
            <AntDesign name="right" size={iconSize} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pressable]}
            onPress={() => router.push("/account/profile/picture")}
          >
            <Row style={styles.row}>
              <AntDesign
                name="picture"
                size={22}
                color={gray}
              />
              <ThemedText type="regular">Profile Picture</ThemedText>
            </Row>
            <AntDesign name="right" size={iconSize} color={iconColor} />
          </TouchableOpacity>
        </View>
      </StackScreen>
    </Screen>
  );
};

export default UpdateOptions;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingTop: 20,
  },
  row: {
    gap: 10,
  },
  pressable: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    height: 40,
  },
});
