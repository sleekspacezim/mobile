import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";

import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import StackScreen from "@/src/Components/StackScreenWrapper/StackScreen";
import Screen from "@/src/Components/ScreenWrapper/Screen";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import PhoneNumberField from "@/src/Components/PhoneNumberField/PhoneNumberField";
import { red } from "@/src/Theme/Colors";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import useUpdateUser from "@/src/Hooks/User/useUpdateUser";
import MessageModal from "@/src/Components/Modals/MessageModal";
import { family } from "@/src/Theme/Font";
import { IPhoneNumberDetails } from "../../Types";
import {
  getContactNumber,
  getUserContactNumberCountryAbbrv,
  getUserContactNumberCountryCode,
} from "@/src/Utils/Funcs";
import { updateAndCreateContactNumberHttpFunc } from "@/src/HttpServices/Mutations/User/ContactNumberHttpFuncs";
import {
  BUTTON_MAX_WIDTH,
  BUTTON_SIZE_SCREEN_BREAK_POINT,
  MAX_INPUT_WIDTH,
  SCREEN_BREAK_POINT,
} from "@/src/Utils/Constants";
import { fetchUserData } from "../../../Hooks/fetchUser";
import { IUser } from "@/src/GlobalTypes/User/UserTypes";

const ProfileUpdate: INoPropsReactComponent = () => {
  const user = useAppSelector((state) => state.user.value);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(true);
  const [isWhatsAppNumberValid, setIsWhatsAppNumberValid] =
    useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string>("");

  const [phoneNumberDetails, setPhoneNumberDetails] =
    useState<IPhoneNumberDetails>({
      number: getContactNumber("phone", user.contactNumbers),
      countryCode: getUserContactNumberCountryCode(
        user.contactNumbers,
        "phone"
      ),
      countryAbbrv: getUserContactNumberCountryAbbrv(
        user.contactNumbers,
        "phone"
      ),
    });
  const [whatsAppNumberDetails, setWhatsAppNumberDetails] =
    useState<IPhoneNumberDetails>({
      number: getContactNumber("whatsapp", user.contactNumbers),
      countryCode: getUserContactNumberCountryCode(
        user.contactNumbers,
        "whatsapp"
      ),
      countryAbbrv: getUserContactNumberCountryAbbrv(
        user.contactNumbers,
        "whatsapp"
      ),
    });
  const [userData, setUserData] = useState<IUser | null>(null);
  const router = useRouter();
  const { width } = useWindowDimensions();
  useUpdateUser(userData);

  const createAndUpdateContactsMutation = useMutation({
    mutationFn: updateAndCreateContactNumberHttpFunc,
    onSuccess(_data) {
      fetchUserData(
        user,
        setUserData,
        setIsLoading,
        setOpenSuccessModal,
        setUpdateError
      );
    },
    onError(error: any) {
      if (error.response?.data?.error !== "") {
        setUpdateError(error.response?.data?.error);
      } else setUpdateError("Something went wrong");
    },
  });

  const handleUpdate = () => {
    if (
      isPhoneNumberValid &&
      isWhatsAppNumberValid &&
      phoneNumberDetails.number &&
      whatsAppNumberDetails.number
    ) {
      setIsLoading(true);
      if (user.contactNumbers.length === 0) {
        createAndUpdateContactsMutation.mutate({
          contactNumbers: [
            {
              number: phoneNumberDetails.number
                ? phoneNumberDetails.number
                : "",
              countryAbbrv: phoneNumberDetails.countryAbbrv
                ? phoneNumberDetails.countryAbbrv
                : "ZW",
              countryCode: phoneNumberDetails.countryCode
                ? phoneNumberDetails.countryCode
                : "",
              userId: user.id,
              type: "phone",
            },
            {
              number: whatsAppNumberDetails.number
                ? whatsAppNumberDetails.number
                : "",
              countryAbbrv: whatsAppNumberDetails.countryAbbrv
                ? whatsAppNumberDetails.countryAbbrv
                : "ZW",
              countryCode: whatsAppNumberDetails.countryCode
                ? whatsAppNumberDetails.countryCode
                : "",
              userId: user.id,
              type: "whatsapp",
            },
          ],
          accessToken: user.accessToken,
          userId: user.id,
        });
      } else {
        createAndUpdateContactsMutation.mutate({
          contactNumbers: [
            {
              number: whatsAppNumberDetails.number
                ? whatsAppNumberDetails.number
                : "",
              countryAbbrv: whatsAppNumberDetails.countryAbbrv
                ? whatsAppNumberDetails.countryAbbrv
                : "ZW",
              countryCode: whatsAppNumberDetails.countryCode
                ? whatsAppNumberDetails.countryCode
                : "",
              userId: user.id,
              type: "whatsapp",
              id: user.contactNumbers.filter(
                (contact) => contact.type === "whatsapp"
              )[0].id,
            },
            {
              number: phoneNumberDetails.number
                ? phoneNumberDetails.number
                : "",
              countryAbbrv: phoneNumberDetails.countryAbbrv
                ? phoneNumberDetails.countryAbbrv
                : "ZW",
              countryCode: phoneNumberDetails.countryCode
                ? phoneNumberDetails.countryCode
                : "",
              userId: user.id,
              type: "phone",
              id: user.contactNumbers.filter(
                (contact) => contact.type === "phone"
              )[0].id,
            },
          ],
          accessToken: user.accessToken,
          userId: user.id,
        });
      }
    } else {
      setUpdateError("please enter correct contact numbers");
    }
  };

  const closeSuccessModal = () => {
    setOpenSuccessModal(false);
    router.back();
  };

  return (
    <Screen>
      <StackScreen>
        <View style={styles.container}>
          <View
            style={[
              styles.inputWrapper,
              { width: width > SCREEN_BREAK_POINT ? MAX_INPUT_WIDTH : "100%" },
            ]}
          >
            <PhoneNumberField
              setPhoneNumberDetails={setPhoneNumberDetails}
              label="Phone Number"
              initialValue={getContactNumber("phone", user.contactNumbers)}
              isNumberValid={isPhoneNumberValid}
              setIsNumberValid={setIsPhoneNumberValid}
              phoneNumberDetails={phoneNumberDetails}
            />
            {!isPhoneNumberValid && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  this number is not valid in this country
                </Text>
              </View>
            )}
            <PhoneNumberField
              setPhoneNumberDetails={setWhatsAppNumberDetails}
              label="Whatsapp Number"
              initialValue={getContactNumber("whatsapp", user.contactNumbers)}
              isNumberValid={isWhatsAppNumberValid}
              setIsNumberValid={setIsWhatsAppNumberValid}
              phoneNumberDetails={whatsAppNumberDetails}
            />
            {!isWhatsAppNumberValid && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  this number is not valid in this country
                </Text>
              </View>
            )}
          </View>
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
            <CustomButton
              title={isLoading ? "loading" : "update"}
              onPressFunc={handleUpdate}
              isDisabled={isLoading}
            />
          </View>
          <MessageModal
            isModalVisible={openSuccessModal}
            header="Update Successful"
            message="your contact numbers have been successfully updated."
            type="success"
            handleCancel={closeSuccessModal}
          />
          <MessageModal
            isModalVisible={updateError ? true : false}
            header="Update Failed"
            message={updateError}
            type="error"
            handleCancel={() => setUpdateError("")}
          />
        </View>
      </StackScreen>
    </Screen>
  );
};

export default ProfileUpdate;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    gap: 20,
    alignItems: "center",
    flex: 1,
  },
  inputWrapper: {
    alignItems: "center",
    gap: 20,
    flex: 1,
  },
  errorText: {
    fontFamily: family,
    color: red,
    fontSize: 13,
    marginTop: -19,
  },
  row: { width: "100%", justifyContent: "space-between", marginTop: -10 },
  errorContainer: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: -1,
  },
  btnContainer: {
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
});
