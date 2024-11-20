import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import Screen from "@/src/Components/ScreenWrapper/Screen";
import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import { family, medium, small } from "@/src/Theme/Font";
import { legalities, preferences, settings } from "./AccountOptions/Options";
import { dark, gray, light, primary, pureWhite } from "@/src/Theme/Colors";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import {
  BUTTON_MAX_WIDTH,
  BUTTON_SIZE_SCREEN_BREAK_POINT,
} from "@/src/Utils/Constants";

const Account: INoPropsReactComponent = () => {
  const theme = useAppSelector((state) => state.theme.value);
  const { accessToken } = useAppSelector((state) => state.user.value);
  const router = useRouter();
  const iconSize = 24;
  const iconColor = theme === "light" ? gray : gray;
  const { width } = useWindowDimensions();
  const onNavigate = (route: string) => {
    router.push(route);
  };
  const handleSignOut = () => {
    router.push("/login");
  };
  return (
    <Screen>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.optionsDetailsWrapper, { marginTop: 20 }]}>
          <Text
            style={[
              styles.headerText,
              { color: theme === "light" ? light.text : dark.text },
            ]}
          >
            Preferences
          </Text>
          <View
            style={[
              styles.optionsContainer,
              {
                backgroundColor:
                  theme === "light" ? pureWhite : dark.background,
              },
            ]}
          >
            {preferences.map(({ name, icon, route }, index) => (
              <Pressable
                key={name}
                style={styles.option}
                onPress={() => onNavigate(route)}
              >
                {icon}
                <View
                  style={[
                    styles.optionIconText,
                    {
                      borderBottomWidth: 1,
                      borderBottomColor:
                        theme === "light" ? light.background : dark.darkGray,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: theme === "light" ? light.text : dark.text },
                    ]}
                  >
                    {name}
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={iconSize}
                    color={iconColor}
                  />
                </View>
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.optionsDetailsWrapper}>
          <Text
            style={[
              styles.headerText,
              { color: theme === "light" ? light.text : dark.text },
            ]}
          >
            Settings
          </Text>
          <View
            style={[
              styles.optionsContainer,
              {
                backgroundColor:
                  theme === "light" ? pureWhite : dark.background,
              },
            ]}
          >
            {settings.map(({ name, icon, route }, index) => (
              <Pressable
                key={name}
                style={styles.option}
                onPress={() => onNavigate(route)}
              >
                {icon}
                <View
                  style={[
                    styles.optionIconText,
                    {
                      borderBottomWidth: 1,
                      borderBottomColor:
                        theme === "light" ? light.background : dark.darkGray,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: theme === "light" ? light.text : dark.text },
                    ]}
                  >
                    {name}
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={iconSize}
                    color={iconColor}
                  />
                </View>
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.optionsDetailsWrapper}>
          <Text
            style={[
              styles.headerText,
              { color: theme === "light" ? light.text : dark.text },
            ]}
          >
            Legalities
          </Text>
          <View
            style={[
              styles.optionsContainer,
              {
                backgroundColor:
                  theme === "light" ? pureWhite : dark.background,
              },
            ]}
          >
            {legalities.map(({ name, icon, route }, index) => (
              <Pressable
                key={name}
                style={styles.option}
                onPress={() => onNavigate(route)}
              >
                {icon}
                <View
                  style={[
                    styles.optionIconText,
                    {
                      borderBottomWidth:
                        index === legalities.length - 1 ? 0 : 1,
                      borderBottomColor:
                        theme === "light" ? light.background : dark.darkGray,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: theme === "light" ? light.text : dark.text },
                    ]}
                  >
                    {name}
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={iconSize}
                    color={iconColor}
                  />
                </View>
              </Pressable>
            ))}
          </View>
        </View>
        <View
          style={[
            {
              width:
                width > BUTTON_SIZE_SCREEN_BREAK_POINT
                  ? BUTTON_MAX_WIDTH
                  : "100%",
            },
            styles.btn,
          ]}
        >
          <CustomButton
            title={accessToken ? "Logout" : "Login"}
            onPressFunc={accessToken?handleSignOut:handleSignOut}
          />
          {!accessToken && (
            <TouchableOpacity
              style={styles.createAccountBtn}
              onPress={() => router.push("/register")}
            >
              <Text style={styles.createAccountText}>create account</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 20,
    paddingBottom: 20,
  },
  lottieContainer: {
    alignSelf: "center",
  },
  optionsDetailsWrapper: {
    gap: 10,
  },
  optionsContainer: {
    gap: 10,
    borderRadius: 10,
  },
  option: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    gap: 15,
  },
  optionIconText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    height: 45,
  },
  optionText: {
    fontFamily: family,
    fontSize: small,
  },
  headerText: {
    fontFamily: family,
    fontSize: medium,
    fontWeight: "bold",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    gap: 10,
  },
  createAccountBtn: {
    borderWidth: 2,
    borderColor: primary,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 7,
  },
  createAccountText: {
    fontFamily: family,
    color: primary,
    fontSize: medium,
  },
});
