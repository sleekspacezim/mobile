import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { router } from "expo-router";

import profile from "@/src/Components/Lotties/user-account.json";
import property from "@/src/Components/Lotties/house.json";
import ThemedText from "../ThemedText/ThemedText";
import RegularText from "../RegularText/RegularText";
import CustomButton from "../Buttons/Custom/CustomButton";
import { primary } from "@/src/Theme/Colors";
import { family, medium } from "@/src/Theme/Font";
import {
  activeOpacityOfTouchableOpacity,
  BUTTON_MAX_WIDTH,
  BUTTON_SIZE_SCREEN_BREAK_POINT,
} from "@/src/Utils/Constants";

type Props = {
  screenType: "profile" | "favorites" | "chats" | "property" | "post_property";
};

const profileHeading = "There's no profile to show";
const postPropertyHeading = "There's no user to post";
const postPropertyContent =
  "Please login or create an account to post a property.";
const profileContent =
  "Please login or create an account to view and update your profile.";

const SigninAndSignupBtn: React.FC<Props> = ({ screenType }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "center" }}>
        <LottieView
          source={screenType === "profile" ? profile : property}
          autoPlay
          loop
          style={{
            height: 200,
            width: 200,
          }}
        />
      </View>
      <ThemedText type="header">
        {screenType === "profile" ? profileHeading : postPropertyHeading}
      </ThemedText>
      <RegularText>
        {screenType === "profile" ? profileContent : postPropertyContent}
      </RegularText>
      <View
        style={[
          {
            width:
              width > BUTTON_SIZE_SCREEN_BREAK_POINT
                ? BUTTON_MAX_WIDTH
                : "100%",
          },
          styles.btnContainer,
        ]}
      >
        <CustomButton title="login" onPressFunc={() => router.push("/login")} />
        <TouchableOpacity
          style={styles.createAccountBtn}
          onPress={() => router.push("/register")}
          activeOpacity={activeOpacityOfTouchableOpacity}
        >
          <Text style={styles.createAccountText}>create account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SigninAndSignupBtn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    gap: 20,
    paddingBottom: 20,
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
  btnContainer: {
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
