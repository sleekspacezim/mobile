import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import StackScreen from "@/src/Components/StackScreenWrapper/StackScreen";
import Screen from "@/src/Components/ScreenWrapper/Screen";
import { useAppDispatch, useAppSelector } from "@/src/Redux/Hooks/Config";
import PhoneNumberField from "@/src/Components/PhoneNumberField/PhoneNumberField";
import { red } from "@/src/Theme/Colors";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import MessageModal from "@/src/Components/Modals/MessageModal";
import { family } from "@/src/Theme/Font";
import {
  getManagerContactNumber,
  getManagerContactNumberCountryAbbrv,
  getManagerContactNumberCountryCode,
} from "@/src/Utils/Funcs";
import {
  BUTTON_MAX_WIDTH,
  BUTTON_SIZE_SCREEN_BREAK_POINT,
  managerAccountUpdateMsg,
  MAX_INPUT_WIDTH,
  SCREEN_BREAK_POINT,
} from "@/src/Utils/Constants";
import { IPhoneNumberDetails } from "../../../../Profile/Screens/Types";
import { UpdateManagerContactNumbers } from "@/src/HttpServices/Mutations/Manager/ContactNumbersHttFuncs";
import RegularText from "@/src/Components/RegularText/RegularText";
import { addManagerAccount } from "@/src/Redux/Slices/ManagerAccountSlice/ManagerSlice";

const Contacts: INoPropsReactComponent = () => {
  const manager = useAppSelector((state) => state.managerAccount.value);
  const { accessToken } = useAppSelector((state) => state.user.value);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(true);
  const [isWhatsAppNumberValid, setIsWhatsAppNumberValid] =
    useState<boolean>(true);
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string>("");
  const dispatch = useAppDispatch();

  const [phoneNumberDetails, setPhoneNumberDetails] =
    useState<IPhoneNumberDetails>({
      number: getManagerContactNumber(manager.contacts, "phone"),
      countryCode: getManagerContactNumberCountryCode(
        manager.contacts,
        "phone"
      ),
      countryAbbrv: getManagerContactNumberCountryAbbrv(
        manager.contacts,
        "phone"
      ),
    });
  const [whatsAppNumberDetails, setWhatsAppNumberDetails] =
    useState<IPhoneNumberDetails>({
      number: getManagerContactNumber(manager.contacts, "whatsapp"),
      countryCode: getManagerContactNumberCountryCode(
        manager.contacts,
        "whatsapp"
      ),
      countryAbbrv: getManagerContactNumberCountryAbbrv(
        manager.contacts,
        "whatsapp"
      ),
    });
  const router = useRouter();
  const { width } = useWindowDimensions();

  const { mutate, isPending } = useMutation({
    mutationFn: UpdateManagerContactNumbers,
    onSuccess(res) {
      dispatch(addManagerAccount(res.data.response));
      setOpenSuccessModal(true);
    },
    onError(error: any) {
      if (error.response?.data?.error !== "") {
        setUpdateError(error.response?.data?.error);
      } else setUpdateError("Something went wrong");
    },
  });

  const getContactId = (type: "phone" | "whatsapp") => {
    const contact = manager.contacts.filter((contact) => contact.type === type);
    return contact[0].id;
  };

  const handleUpdate = () => {
    if (
      isPhoneNumberValid &&
      isWhatsAppNumberValid &&
      phoneNumberDetails.number &&
      whatsAppNumberDetails.number
    ) {
      mutate({
        managerContacts: [
          {
            id: getContactId("phone"),
            number: phoneNumberDetails.number ? phoneNumberDetails.number : "",
            countryAbbrv: phoneNumberDetails.countryAbbrv
              ? phoneNumberDetails.countryAbbrv
              : "ZW",
            countryCode: phoneNumberDetails.countryCode
              ? phoneNumberDetails.countryCode
              : "",
            managerId: manager.id,
            type: "phone",
          },
          {
            id: getContactId("whatsapp"),
            number: whatsAppNumberDetails.number
              ? whatsAppNumberDetails.number
              : "",
            countryAbbrv: whatsAppNumberDetails.countryAbbrv
              ? whatsAppNumberDetails.countryAbbrv
              : "ZW",
            countryCode: whatsAppNumberDetails.countryCode
              ? whatsAppNumberDetails.countryCode
              : "",
            managerId: manager.id,
            type: "whatsapp",
          },
        ],
        accessToken: accessToken,
        managerId: manager.id,
      });
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
              initialValue={getManagerContactNumber(manager.contacts, "phone")}
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
              initialValue={getManagerContactNumber(
                manager.contacts,
                "whatsapp"
              )}
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
            <RegularText>{managerAccountUpdateMsg}</RegularText>
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
              title={isPending ? "loading" : "update"}
              onPressFunc={handleUpdate}
              isDisabled={isPending}
            />
          </View>
          <MessageModal
            isModalVisible={openSuccessModal}
            header="Account Updated!"
            message="you have successfully updated your property manager account contacts. Please note, all your properties will be updated with this new information."
            type="success"
            handleCancel={closeSuccessModal}
          />
          <MessageModal
            isModalVisible={updateError ? true : false}
            header="Update Failed!"
            message={updateError}
            type="error"
            handleCancel={() => setUpdateError("")}
          />
        </View>
      </StackScreen>
    </Screen>
  );
};

export default Contacts;

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
