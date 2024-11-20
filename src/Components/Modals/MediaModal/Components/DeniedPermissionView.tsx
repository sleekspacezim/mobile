import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Linking } from 'react-native';

import ThemedText from "@/src/Components/ThemedText/ThemedText";
import { IVoidFunc } from "@/src/GlobalTypes/Types";
import {
  pureWhite,
  dark,
  white,
  light,
  red,
  primary,
} from "@/src/Theme/Colors";
import { family, large, medium } from "@/src/Theme/Font";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { activeOpacityOfTouchableOpacity } from "@/src/Utils/Constants";

type Props = {
  handleCancel: IVoidFunc;
};

const DeniedPermissionView: React.FC<Props> = ({ handleCancel }) => {
  const {
    container,
    headerText,
    iconContainer,
    btn,
    btnContainer,
    regulartext,
  } = styles;
  const { width } = useWindowDimensions();
  const theme = useAppSelector((state) => state.theme.value);
  const color = red;
  const iconSize = 30;
  const handleNavigateToSettings = () => Linking.openSettings();
  return (
    <View
      style={[
        container,
        {
          width: width > 500 ? 420 : 250,
          backgroundColor: theme === "light" ? pureWhite : dark.background,
          borderTopColor: color,
        },
      ]}
    >
      <View style={[iconContainer, { backgroundColor: color }]}>
        <MaterialCommunityIcons
          name="window-close"
          size={iconSize}
          color={white}
        />
      </View>
      <Text
        style={[
          headerText,
          { color: theme === "light" ? light.text : dark.text },
        ]}
      >
        Permission Denied!
      </Text>
      <ThemedText type="regular">
        Sleek Space does not have permissions to access either your media
        library or your camera, please go to your settings and allow the app to
        have access to your camera and media.
      </ThemedText>
      <View style={btnContainer}>
        <TouchableOpacity
          style={[btn, { backgroundColor: primary }]}
          onPress={handleNavigateToSettings}
          activeOpacity={activeOpacityOfTouchableOpacity}
        >
          <Text style={styles.regulartext}>go to settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[btn, { backgroundColor: color }]}
          onPress={handleCancel}
          activeOpacity={activeOpacityOfTouchableOpacity}
        >
          <Text style={regulartext}>back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeniedPermissionView;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 15,
    paddingTop: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderTopWidth: 3,
  },
  iconContainer: {
    position: "absolute",
    top: -25,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontFamily: family,
    fontSize: large,
    fontWeight: "bold",
    marginBottom: 10,
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: "100%",
    gap: 10,
  },
  btn: {
    width: "100%",
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  regulartext: {
    fontFamily: family,
    fontSize: medium,
    color: white,
  },
});
