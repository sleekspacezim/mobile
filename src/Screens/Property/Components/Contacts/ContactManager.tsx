import {
  Linking,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import {
  IManagerAccount,
  IManagerContactNumber,
} from "@/src/GlobalTypes/Manager/ManagerTypes";
import MessageModal from "@/src/Components/Modals/MessageModal";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import {
  primary,
  green,
  lighterPrimary,
  red,
  light,
  dark,
  white,
  pureWhite,
  lightGray,
} from "@/src/Theme/Colors";
import { family, small } from "@/src/Theme/Font";
import {
  SCREEN_BREAK_POINT,
  activeOpacityOfTouchableOpacity,
} from "@/src/Utils/Constants";
import { getManagerContactNumber } from "@/src/Utils/Funcs";

type Props = {
  manager: IManagerAccount;
};

const ContactManager: React.FC<Props> = ({ manager }) => {
  const [emailError, setEmailError] = useState<string>("");
  const [phoneCallError, setPhoneCallError] = useState<string>("");
  const theme = useAppSelector((state) => state.theme.value);
  const { width } = useWindowDimensions();
  const navigateToWhatsApp = (contacts: IManagerContactNumber[]) => {
    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${getManagerContactNumber(
        contacts,
        "whatsapp"
      )}`
    );
  };

  const makePhoneCall = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch((_err) =>
      setPhoneCallError("unable to make a phone call")
    );
  };

  const sendEmail = (email: string) => {
    if (email) {
      const url = `mailto:${email}?subject=${encodeURIComponent(
        "Property Enquiry"
      )}&body=${encodeURIComponent("")}`;
      Linking.openURL(url).catch((err) =>
        setEmailError("Unable to send email")
      );
    } else {
      setEmailError("this property manager does not have an email");
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: width < SCREEN_BREAK_POINT ? "100%" : 500,
          backgroundColor: theme === "dark" ? dark.background : pureWhite,
          borderTopWidth: 1,
          borderTopColor: theme === "dark" ? dark.darkGray : lightGray,
          justifyContent:
            width < SCREEN_BREAK_POINT ? "space-between" : "center",
        },
      ]}
    >
      <TouchableOpacity
        style={styles.contact}
        activeOpacity={activeOpacityOfTouchableOpacity}
        onPress={() => sendEmail(manager.email)}
      >
        <MaterialCommunityIcons name={"email"} size={24} color={red} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.contact}
        activeOpacity={activeOpacityOfTouchableOpacity}
        onPress={() =>
          makePhoneCall(getManagerContactNumber(manager.contacts, "phone"))
        }
      >
        <MaterialIcons
          name="phone-in-talk"
          size={24}
          color={theme === "dark" ? light.background : dark.background}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.contact}
        activeOpacity={activeOpacityOfTouchableOpacity}
        onPress={() => navigateToWhatsApp(manager.contacts)}
      >
        <FontAwesome name="whatsapp" size={24} color={green} />
      </TouchableOpacity>
      <MessageModal
        handleCancel={() => {
          setPhoneCallError("");
        }}
        message={phoneCallError}
        isModalVisible={phoneCallError ? true : false}
        type="error"
        header="Phone call error"
      />
      <MessageModal
        handleCancel={() => {
          setEmailError("");
        }}
        message={emailError}
        isModalVisible={emailError ? true : false}
        type="error"
        header="Email error"
      />
    </View>
  );
};

export default ContactManager;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10,
    alignSelf: "center"
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: lighterPrimary,
    width: 100,
    height: 45,
    borderRadius: 10,
    gap: 5,
  },
  text: {
    fontFamily: family,
    color: primary,
    fontSize: small,
  },
});
