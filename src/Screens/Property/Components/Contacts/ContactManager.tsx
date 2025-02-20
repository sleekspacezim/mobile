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
import { useMutation } from "@tanstack/react-query";

import { IManagerAccount } from "@/src/GlobalTypes/Manager/ManagerTypes";
import MessageModal from "@/src/Components/Modals/MessageModal";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import {
  primary,
  green,
  lighterPrimary,
  red,
  light,
  dark,
  pureWhite,
  lightGray,
} from "@/src/Theme/Colors";
import { family, small } from "@/src/Theme/Font";
import {
  SCREEN_BREAK_POINT,
  activeOpacityOfTouchableOpacity,
} from "@/src/Utils/Constants";
import { getManagerContactNumber } from "@/src/Utils/Funcs";
import { updateAndIncreamentPropertyInsightsByPropertyIdHttpFunc } from "@/src/HttpServices/Mutations/Property/Insights/InsightsHttpFunc";
import ButtonSpinner from "@/src/Components/Spinners/ButtonSpinner";

type Props = {
  manager: IManagerAccount;
  propertyUniqueId: number;
};

const ContactManager: React.FC<Props> = ({ manager, propertyUniqueId }) => {
  const [isWhatsAppLoading, setIsWhatsAppLoading] = useState<boolean>(false);
  const [isEmailLoading, setIsEmailLoading] = useState<boolean>(false);
  const [isPhoneCallLoading, setIsPhoneCallLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [phoneCallError, setPhoneCallError] = useState<string>("");
  const theme = useAppSelector((state) => state.theme.value);
  const { id } = useAppSelector((state) => state.user.value);
  const { width } = useWindowDimensions();

  const updatePropertyInsightsOnWhatsAppPressPressMutation = useMutation({
    mutationFn: updateAndIncreamentPropertyInsightsByPropertyIdHttpFunc,
    onSettled: () => {
      setIsWhatsAppLoading(false);
      Linking.openURL(
        `http://api.whatsapp.com/send?phone=${getManagerContactNumber(
          manager.contacts,
          "whatsapp"
        )}`
      );
    },
  });

  const updatePropertyInsightsOnPhoneCallMutation = useMutation({
    mutationFn: updateAndIncreamentPropertyInsightsByPropertyIdHttpFunc,
    onSettled: () => {
      setIsPhoneCallLoading(false);
      const url = `tel:${getManagerContactNumber(manager.contacts, "phone")}`;
      Linking.openURL(url).catch((_err) =>
        setPhoneCallError("unable to make a phone call")
      );
    },
  });

  const updatePropertyInsightsOnEmailPressMutation = useMutation({
    mutationFn: updateAndIncreamentPropertyInsightsByPropertyIdHttpFunc,
    onSettled: () => {
      setIsEmailLoading(false);
      const url = `mailto:${manager.email}?subject=${encodeURIComponent(
        "Property Enquiry"
      )}&body=${encodeURIComponent("")}`;
      Linking.openURL(url).catch((err) =>
        setEmailError("Unable to send email")
      );
    },
  });

  const navigateToWhatsApp = () => {
    if (id !== manager.userId) {
      setIsWhatsAppLoading(true);
      updatePropertyInsightsOnWhatsAppPressPressMutation.mutate({
        propertyId: propertyUniqueId,
        data: { insightProperty: "whatsAppAttempts" },
      });
    }
  };

  const makePhoneCall = () => {
    if (manager.userId !== id) {
      setIsPhoneCallLoading(true);
      updatePropertyInsightsOnPhoneCallMutation.mutate({
        propertyId: propertyUniqueId,
        data: { insightProperty: "callAttempts" },
      });
    }
  };

  const sendEmail = () => {
    if (manager.userId !== id) {
      if (manager.email) {
        setIsEmailLoading(true);
        updatePropertyInsightsOnEmailPressMutation.mutate({
          propertyId: propertyUniqueId,
          data: { insightProperty: "emailAttempts" },
        });
      } else {
        setEmailError("this property manager does not have an email");
      }
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: "100%",
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
        onPress={() => sendEmail()}
        disabled={
          isEmailLoading || isPhoneCallLoading || isWhatsAppLoading
            ? true
            : false
        }
      >
        {isEmailLoading ? (
          <ButtonSpinner backGroundColor={red} />
        ) : (
          <MaterialCommunityIcons name={"email"} size={24} color={red} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.contact}
        activeOpacity={activeOpacityOfTouchableOpacity}
        onPress={() => makePhoneCall()}
        disabled={
          isEmailLoading || isPhoneCallLoading || isWhatsAppLoading
            ? true
            : false
        }
      >
        {isPhoneCallLoading ? (
          <ButtonSpinner
            backGroundColor={
              theme === "dark" ? light.background : dark.background
            }
          />
        ) : (
          <MaterialIcons
            name="phone-in-talk"
            size={24}
            color={theme === "dark" ? light.background : dark.background}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.contact}
        activeOpacity={activeOpacityOfTouchableOpacity}
        onPress={() => navigateToWhatsApp()}
        disabled={
          isEmailLoading || isPhoneCallLoading || isWhatsAppLoading
            ? true
            : false
        }
      >
        {isWhatsAppLoading ? (
          <ButtonSpinner backGroundColor={green} />
        ) : (
          <FontAwesome name="whatsapp" size={24} color={green} />
        )}
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
    alignSelf: "center",
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
