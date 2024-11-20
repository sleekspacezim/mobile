import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import {
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

import Screen from "@/src/Components/ScreenWrapper/Screen";
import StackScreen from "@/src/Components/StackScreenWrapper/StackScreen";
import { SCREEN_BREAK_POINT } from "@/src/Utils/Constants";
import { gray } from "@/src/Theme/Colors";
import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import Row from "@/src/Components/Row/Row";
import ThemedText from "@/src/Components/ThemedText/ThemedText";

const UpdateAccount: INoPropsReactComponent = () => {
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
            onPress={() => router.push("/account/manager/update/contacts")}
          >
            <Row style={styles.row}>
              <MaterialCommunityIcons
                name="contacts-outline"
                size={24}
                color={gray}
              />
              <ThemedText type="regular">Contacts</ThemedText>
            </Row>
            <AntDesign name="right" size={iconSize} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pressable]}
            onPress={() => router.push("/account/manager/update/details")}
          >
            <Row style={styles.row}>
              <MaterialCommunityIcons
                name="card-account-details-outline"
                size={22}
                color={iconColor}
              />
              <ThemedText type="regular">Details</ThemedText>
            </Row>
            <AntDesign name="right" size={iconSize} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pressable]}
            onPress={() => router.push("/account/manager/update/picture")}
          >
            <Row style={styles.row}>
              <AntDesign name="picture" size={22} color={gray} />
              <ThemedText type="regular">Profile Picture</ThemedText>
            </Row>
            <AntDesign name="right" size={iconSize} color={iconColor} />
          </TouchableOpacity>
        </View>
      </StackScreen>
    </Screen>
  );
};

export default UpdateAccount;

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
